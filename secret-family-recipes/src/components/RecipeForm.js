
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import schema from './validation/formSchemaRecipes'
import Recipe from './Recipe'
import Ingredient from './Ingredient';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const defaultIngredientObj = { ingredient : { ingredientid: "", name: "", amount: "" } }

const initialRecipeFormValues = {
    ///// TEXT INPUTS /////
    name: '',
    source: '',
    time: '',
    instructions: '',
    ingredients: [defaultIngredientObj],
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

export default function RecipeForm (props) {

//set state 
      const [recipes, setRecipes] = useState(initialRecipes)        
      const [formRecipeValues, setFormRecipeValues] = useState(initialRecipeFormValues) 
      const [formRecipeErrors, setFormRecipeErrors] = useState(initialRecipeFormErrors) 
      const [disabledRecipe, setDisabledRecipe] = useState(initialRecipeDisabled)   
    
// Posting new recipe to backend
    //   useEffect(() => {
    //     axiosWithAuth()
    //     .post('/recipes/recipe', formRecipeValues)
    //     .then(res => {
    //         console.log('recipeForm response', res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [])
    
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
        axiosWithAuth()
          .post('/recipes/recipe', formRecipeValues)
          .then(res => {
              console.log('recipeForm response', res)
          })
          .catch(err => {
              console.log(err)
          })

      const newRecipe = {
        name: formRecipeValues.name.trim(),
        source: formRecipeValues.source.trim(),
        length_of_time: formRecipeValues.time.trim(),
        ingredients: formRecipeValues.ingredients,
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
   

        return (
            <form className='form container' onSubmit={formSubmit}>
           
            <div className='recipeInput'>
                 <p className='title'>Keep track of your family's favorites...</p>

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
                <label>Time it takes&nbsp;
                        <input
                            value={formRecipeValues.time}
                            onChange={onChange}
                            name='time'
                            type='text'
                        />
                        </label>
                        <br/>
                <label>What goes in it&nbsp;
                        <input
                            value={formRecipeValues.ingredients}
                            onChange={onChange}
                            name='ingredients'
                            type='text'
                        />
                        </label>
                        {/* <label>Ingredients&nbsp;
                          {formRecipeValues.ingredients.map((item, index) => {
                            console.log(item)
                            return (
                              <input
                                item={item}
                                key={index}
                                index={index}
                                onChange={onChange}
                              />
                            );
                          })}
                        <input
                            value={formRecipeValues.ingredients}
                            onChange={onChange}
                            name='ingredients'
                            type='text'
                        />

                        </label> */}
                        <br/>
                <label>Recipe Instructions&nbsp;
                        <input
                            value={formRecipeValues.instructions}
                            onChange={onChange}
                            name='instructions'
                            type='text'
                        />
                        </label>
                        <br/>
                      
                {/* ////////// CHECKBOXES ////////// */}
                <div className='form-group checkboxes'>
                <h4>Recipe Category:</h4>
                <label>Breakfast&nbsp;
                <input
                    type="checkbox"
                    name="breakfast"
                    checked={formRecipeValues.breakfast}
                    onChange={onChange}
                />&nbsp;
                </label>

                <label>Dinner&nbsp;
                <input
                    type="checkbox"
                    name='dinner'
                    checked={formRecipeValues.dinner}
                    onChange={onChange}
                />&nbsp;
                </label>

                <label>Chicken Dish&nbsp;
                <input
                    type="checkbox"
                    name="chicken"
                    checked={formRecipeValues.chicken}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label>Beef Dish&nbsp;
                <input
                    type="checkbox"
                    name="beef"
                    checked={formRecipeValues.beef}
                    onChange={onChange}
                />&nbsp;
                </label>   
                
                <label>Pork Dish&nbsp;
                <input
                    type="checkbox"
                    name="pork"
                    checked={formRecipeValues.pork}
                    onChange={onChange}
                />&nbsp;
                </label>   
                <br/>
                 <label>Fish Dish&nbsp;
                <input
                    type="checkbox"
                    name="fish"
                    checked={formRecipeValues.fish}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label>Vegetables&nbsp;
                <input
                    type="checkbox"
                    name="vegetables"
                    checked={formRecipeValues.vegetables}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label>Soup&nbsp;
                <input
                    type="checkbox"
                    name="soup"
                    checked={formRecipeValues.soup}
                    onChange={onChange}
                />&nbsp;
                </label>  

                <label>Dessert&nbsp;
                <input
                    type="checkbox"
                    name="dessert"
                    checked={formRecipeValues.dessert}
                    onChange={onChange}
                />&nbsp;
                </label> 

                <button disabled={disabledRecipe}>submit</button>   

            {recipes.map(details => {
          return (
            <Recipe key={details.id} details={details} />
          )
            })}
            
            
            </div>
            </div>
            </div>
      </form>
        )
        }


