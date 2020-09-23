
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import schema from './validation/formSchemaRecipes'
import Ingredient from './Ingredient';
import styled from 'styled-components'

import { axiosWithAuth } from '../utils/axiosWithAuth';
import { setState } from 'theme-provider';


// import { addRecipe } from '../actions/recipeActions';
// import { connect } from 'react-redux';

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

const defaultIngredientObj = { "ingredient" : { "name": "", "amount": "" } }
const defaultCategoryObj = { "categories" :{ "categoryname" : "" }}
const initialRecipeFormValues = {
    ///// TEXT INPUTS /////
    title: '',
    source: '',
    preptime: '',
    ingredients: [],
    categories: [],
    instruction: '',
    }
    
    const initialRecipeFormErrors={
    title: '',
    source: '',
    // time: '',
    ingredients:[],
    categories: [],
    instruction: '',
    }
    
    const initialRecipes = []
    const initialRecipeDisabled = true
    const initialIngredientList= []
    const initialCategories = []

export default function RecipeForm (props) {

//set state 
      const [recipes, setRecipes] = useState(initialRecipes)        
      const [formRecipeValues, setFormRecipeValues] = useState(initialRecipeFormValues) 
      const [formRecipeErrors, setFormRecipeErrors] = useState(initialRecipeFormErrors) 
      const [disabledRecipe, setDisabledRecipe] = useState(initialRecipeDisabled)  
      const [ingredient, setIngredient] = useState(initialIngredientList)
      const [categories, setCategories ] = useState(initialCategories)
     
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
        // useEffect(() => {
    //   getRecipes()
    // }, [])
    
    const postNewRecipe = newRecipe => {
      axiosWithAuth()
        .post('/recipes/recipe', newRecipe)
        .then(res => {
          console.log(res)
          setRecipes([...recipes, res.data]) 
          // setRecipes(recipes.concat(res.data))?        
        })
        .catch(err => {
          // debugger
          console.log(err)
        })
        // .finally(() => {
        //     setFormRecipeValues(initialRecipeFormValues)
        // })
    }
    
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
    
    // Input change handler
    const inputChange = (name, value) => {
      validateRecipe(name, value)
      setFormRecipeValues({
        ...formRecipeValues,
        [name]: value 
      })
    }

    const onChange = evt => {
      const { name, value, type, checked } = evt.target
      const valueToUse = type === 'checkbox' ? checked : value
      inputChange(name, valueToUse)
    }
    
 // adds new recipe to profile
    const formSubmit = (event) => {
        event.preventDefault()
        
        const newRecipe = {
          title: formRecipeValues.title.trim(),
          source: formRecipeValues.source.trim(),
          preptime: formRecipeValues.preptime.trim(),
          ingredients: formRecipeValues.ingredients,
          categories: formRecipeValues.categories,
          instruction: formRecipeValues.instruction.trim(),
      }
      postNewRecipe(newRecipe)
    }

    // VALIDATION
    useEffect(() => {
      schema.isValid(formRecipeValues)
          .then(valid => {
            setDisabledRecipe(!valid)
          })
      }, [formRecipeValues])
  
   
      // to add ingredients function version 1
      const onClick =evt =>{
        //setIngreident(evt.target.value)
        const { name, value} = evt.target
        setIngredient({
          ...ingredient,
          [name]: value 
        })
        setIngredient(initialIngredientList)
      }

      const onCatChange = evt => {
        const { name, value } = evt.target
        setCategories({
          ...categories,
          [name]: value
        })
        setCategories(initialCategories)
      }

      // to add ingredients function version 2
      // function addIngredient(e) {
      //   e.preventDefault();
      //   setFormRecipeValues({
      //     ...formRecipeValues,
      //     ingredients: [...formRecipeValues.ingredients],
      //   });
      // }
      // // goes with add ingredient function version 2
      // function newIngredients(ingredientObj, index) {
      //   const result = [...formRecipeValues.ingredients];
      //   result[index] = ingredientObj;
      //   return result;
      // }
      // // goes with add ingredient function version 2
      // function updateIngredients(index, ingredientObj) {
      //   const updatedIngredients = newIngredients(ingredientObj, index);
      //   setFormRecipeValues({
      //     ...formRecipeValues,
      //     ingredients: updatedIngredients
      //   });
      // }

        return (
          <StyledRecipe>
            <form className='form container' onSubmit={formSubmit}>
            <h2>Keep track of your family's favorites!</h2>
            <div className='recipeInput'>
              

                <div className='errors'>
                {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
                <div>{formRecipeErrors.title}</div>
                <div>{formRecipeErrors.source}</div>
                {/* <div>{formRecipeErrors.time}</div> */}
                <div>{formRecipeErrors.ingredients}</div>
                <div>{formRecipeErrors.instruction}</div>
                </div>
                    
            <div className='form-recipe inputs'>       
        
                 <label>Recipe Title&nbsp;
                        <input
                            value={formRecipeValues.title}
                            onChange={onChange}
                            name='title'
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
                            value={formRecipeValues.preptime}
                            onChange={onChange}
                            name='preptime'
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
                        {/* <label>Ingredients&nbsp;
                          {formRecipeValues.ingredients.map((item, index) => {
                            console.log(item)
                            return (
                              <Ingredient
                                item={item}
                                onChange={onChange}
                                key={index}
                                index={index}
                                updateIngredients={updateIngredients}
                              />
                            );
                          })}
                          <button onClick={addIngredient}>Add</button>
                        </label> */}
                      
                        <br/>
                      <label>Instructions&nbsp;
                        <textarea rows = "10" cols ="30"
                            value={formRecipeValues.instruction}
                            onChange={onChange}
                            name='instruction'
                            type='text'
                        />
                        </label>
                        <br/>
              
                        <label>Recipe Category&nbsp;
                        <input
                            value={formRecipeValues.categories}
                            onChange={onChange}
                            name='categories'
                            type='text'
                        />
                        </label>   
            
                <button className='submitBtn' disabled={disabledRecipe}>submit</button>   
            </div>
          </div>
      </form>
   </StyledRecipe>
        )
        }


// function mapStateToProps(state) {
//           return {
//               title: state.title,
//               source: state.source,
//               ingredients: state.ingredients,
//               instruction: state.instruction
//           };
//       };
      
      
// export default connect(mapStateToProps, { addRecipe })(RecipeForm);