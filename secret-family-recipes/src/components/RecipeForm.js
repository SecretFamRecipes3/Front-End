
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import schema from './validation/formSchemaRecipes'
import Recipe from './Recipe'
import styled from 'styled-components'



const StyledRecipe = styled.div `
 border: 5px solid #89B0AE;
 width: 40%;
 margin: 0 auto;
 padding-left: 4%;  
 background-color:#FAF9F9;
 /* font-family:'@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap')'; */
 
h2{
  color:#555B6E;
}

label{
  display:flex;
  color:#555B6E;
 }

h4{
margin: 0 auto;
padding-bottom:1%;
}
.form-group-checkboxes{
  columns:3;
 }  

.submitBtn{
  margin-left:35%;
  margin-top:2%;
  margin-bottom:2%;
 }

 textarea{
  font-family:'arial' }

  .errors{
    color:red;
  }


  @media ${pr => pr.theme.mobileBreakpoint} {
    width: initial;
  }
`
const initialRecipeFormValues = {
    ///// TEXT INPUTS /////
    name: '',
    source: '',
    time: '',
    instructions: '',
    ingredients: [],
    ///// CHECKBOXES /////
    Breakfast: false,
    Dinner: false,
    Chicken: false,
    Pork: false,
    Fish: false,
    Beef: false,
    Vegetables: false,
    Soup: false,
    Dessert: false,
    }
    
    const initialRecipeFormErrors={
    name: '',
    source: '',
    time: '',
    instructions: '',
    ingredients: [],
    }
    
    const initialRecipes = []
    const initialRecipeDisabled = true
    const initialIngredientList= []

export default function RecipeForm (props) {

//set state 
      const [recipes, setRecipes] = useState(initialRecipes)        
      const [formRecipeValues, setFormRecipeValues] = useState(initialRecipeFormValues) 
      const [formRecipeErrors, setFormRecipeErrors] = useState(initialRecipeFormErrors) 
      const [disabledRecipe, setDisabledRecipe] = useState(initialRecipeDisabled)  
      const [ingredient, setIngredient] = useState(initialIngredientList)
    
    
    //   const getRecipes = () => {
    //     axios.get('')
    //     .then(res => {
    //       setRecipes(res.data.data)
    //     })
    //     .catch(err => {
    //       debugger
    //       console.log(err)
    //     })
    // }
    
    
    // const postNewRecipe = newRecipe => {
    //   axios.post('', newRecipe)
    //     .then(res => {
    //       setRecipes([...recipes, res.data]) 
    //       setFormRecipeValues(initialRecipeFormValues)
    //     })
    //     .catch(err => {
    //       debugger
    //       console.log(err)
    //     })
    // }
    
    const validateRecipe = (name, value) => {
      yup
        .reach(schema, name)
        .validate(value)
        .then(valid => {
          setFormRecipeErrors({
            ...formRecipeErrors,
            [name]: ""
          })
        })
        .catch(err => {
          setFormRecipeErrors({
            ...formRecipeErrors,
            [name]: err.errors[0]
          });
        });
    }
    
    const inputChange = (name, value) => {
      validateRecipe(name, value)
      setFormRecipeValues({
        ...formRecipeValues,
        [name]: value 
      })
    }
    
    const formSubmit = (event) => {
        event.preventDefault()
      const newRecipe = {
        name: formRecipeValues.name.trim(),
        source: formRecipeValues.source.trim(),
        length_of_time: formRecipeValues.time.trim(),
        ingredients: formRecipeValues.ingredients.trim(),
        instructions: formRecipeValues.instructions.trim(),
        category: ['breakfast', 'dinner', 'chicken','beef','pork','fish','vegetables', 'soup', 'dessert'].filter(cat => formRecipeValues[cat]),
      }
      //postNewRecipe(newRecipe)
      // setFormRecipeValues(initialRecipeFormValues)
    }
    // useEffect(() => {
    //   getRecipes()
    // }, [])
    
    useEffect(() => {
      schema.isValid(formRecipeValues)
          .then(valid => {
            setDisabledRecipe(!valid)
          })
      }, [formRecipeValues])
    

      const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        inputChange(name, valueToUse)
      }
   
      const onClick =evt =>{
        //setIngreident(evt.target.value)
        const { name, value} = evt.target
        setIngredient({
          ...ingredient,
          [name]: value 
        })
        setIngredient(initialIngredientList)
      }

        return (
          <StyledRecipe>
            <form className='form container' onSubmit={formSubmit}>
            <h2>Keep track of your family's favorites!</h2>
            <div className='recipeInput'>
              

                <div className='errors'>
                {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
                <div>{formRecipeErrors.name}</div>
                <div>{formRecipeErrors.source}</div>
                <div>{formRecipeErrors.time}</div>
                <div>{formRecipeErrors.ingredients}</div>
                <div>{formRecipeErrors.instructions}</div>
                </div>
                    
            <div className='form-recipe inputs'>       
        
                 <label>Recipe Name&nbsp;
                        <input
                            value={formRecipeValues.name}
                            onChange={onChange}
                            name='name'
                            type='text'
                        />
                        </label>
                        <br/>
                <label>Source&nbsp;
                        <input
                            value={formRecipeValues.source}
                            onChange={onChange}
                            name='source'
                            type='text'
                        />
                        </label>
                        <br/>
                <label>Prep + Cook Time&nbsp;
                        <textarea 
                            value={formRecipeValues.time}
                            onChange={onChange}
                            name='time'
                            type='text'
                            placeholder='prep:30min total time:2hr'
                        />
                        </label>
                        <br/>
                        
                <label>Ingredients&nbsp;
                        <input
                            value={formRecipeValues.ingredients}
                            onChange={onChange}
                            name='ingredients'
                            type='text'
                        /> <button onClick={onClick}>+</button>
                        
                        </label>
                      
                        <br/>
                <label>Instructions&nbsp;
                        <textarea rows = "10" cols ="30"
                            value={formRecipeValues.instructions}
                            onChange={onChange}
                            name='instructions'
                            type='text'
                        />
                        </label>
                        <br/>
                        <h4>Recipe Category:</h4>   
                {/* ////////// CHECKBOXES ////////// */}
                <div className='form-group-checkboxes'>
                
                <label className='checkbox'>Breakfast&nbsp;
                <input
                    type="checkbox"
                    name="breakfast"
                    checked={formRecipeValues.breakfast}
                    onChange={onChange}
                />&nbsp;
                </label>

                <label className='checkbox'>Dinner&nbsp;
                <input
                    type="checkbox"
                    name='dinner'
                    checked={formRecipeValues.dinner}
                    onChange={onChange}
                />&nbsp;
                </label>

                <label className='checkbox'>Chicken Dish&nbsp;
                <input
                    type="checkbox"
                    name="chicken"
                    checked={formRecipeValues.chicken}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label className='checkbox'>Beef Dish&nbsp;
                <input
                    type="checkbox"
                    name="beef"
                    checked={formRecipeValues.beef}
                    onChange={onChange}
                />&nbsp;
                </label>   
                
                <label className='checkbox'>Pork Dish&nbsp;
                <input
                    type="checkbox"
                    name="pork"
                    checked={formRecipeValues.pork}
                    onChange={onChange}
                />&nbsp;
                </label>   
               
                 <label className='checkbox'>Fish Dish&nbsp;
                <input
                    type="checkbox"
                    name="fish"
                    checked={formRecipeValues.fish}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label className='checkbox'>Vegetables&nbsp;
                <input
                    type="checkbox"
                    name="vegetables"
                    checked={formRecipeValues.vegetables}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label className='checkbox'>Soup&nbsp;
                <input
                    type="checkbox"
                    name="soup"
                    checked={formRecipeValues.soup}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label className='checkbox'>Dessert&nbsp;
                <input
                    type="checkbox"
                    name="dessert"
                    checked={formRecipeValues.dessert}
                    onChange={onChange}
                />&nbsp;
                </label> 
                </div>
                <button className='submitBtn' disabled={disabledRecipe}>submit</button>   

            {recipes.map(details => {
          return (
            <Recipe key={details.id} details={details} />
          )
            })}
            
            
            
            </div>
            </div>
      </form>
   </StyledRecipe>
        )
        }


