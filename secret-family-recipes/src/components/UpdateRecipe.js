import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';


const defaultIngredientObj = { ingredient : { ingredientid: "", name: "", amount: "" } }
const initialRecipeDetails = {
    ///// TEXT INPUTS /////
    title: '',
    source: '',
    // time: '',
    ingredients: [],
    instruction: '',
    ///// CHECKBOXES /////
    // Breakfast: false,
    // Dinner: false,
    // Chicken: false,
    // Pork: false,
    // Fish: false,
    // Beef: false,
    // Vegetables: false,
    // Soup: false,
    // Dessert: false,
    }

const UpdateRecipe = (props) => {
    const [ recipeDetails, setRecipeDetails ] = useState(initialRecipeDetails)
    const { id } = useParams();
    const history = useHistory();
    const { userRecipes, setUserRecipes } = props;

    const inputChange = evt => {
        setRecipeDetails({
            ...recipeDetails,
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        axios 
        .put(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${id}`, recipeDetails)
        .then(res => {
            console.log('put response', res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    // should be re-populating the edit form with the recipe info of the id requested
    useEffect(() => {
        axios
        .get(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${id}`)
        .then(res => {
            console.log('call for recipe via id', res)
            // setRecipeDetails(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
        <form className='form container' onSubmit={handleSubmit}>
            
        <div className='form-recipe inputs'>       
    
             <label>Recipe Title&nbsp;
                    <input
                        value={recipeDetails.title}
                        onChange={inputChange}
                        name='title'
                        type='text'
                    />
                    </label>
                    <br/>
            <label>Source&nbsp;
                    <input
                        value={recipeDetails.source}
                        onChange={inputChange}
                        name='source'
                        type='text'
                    />
                    </label>
                    <br/>
            {/* <label>Time it takes&nbsp;
                    <input
                        value={recipeDetails.time}
                        onChange={inputChange}
                        name='time'
                        type='text'
                    />
                    </label> */}
                    <br/>
            <label>Ingredients&nbsp;
                    <input
                        value={recipeDetails.ingredients}
                        onChange={inputChange}
                        name='ingredients'
                        type='text'
                    />
                    </label>
                    <br/>
            <label>Recipe Instructions&nbsp;
                    <input
                        value={recipeDetails.instruction}
                        onChange={inputChange}
                        name='instructions'
                        type='text'
                    />
                    </label>
                    <br/>
                  
            {/* ////////// CHECKBOXES ////////// */}
        {/* <div className='form-group checkboxes'>
            <h4>Recipe Category:</h4>
            <label>Breakfast&nbsp;
            <input
                type="checkbox"
                name="breakfast"
                checked={recipeDetails.breakfast}
                onChange={inputChange}
            />&nbsp;
            </label>

            <label>Dinner&nbsp;
            <input
                type="checkbox"
                name='dinner'
                checked={recipeDetails.dinner}
                onChange={inputChange}
            />&nbsp;
            </label>

            <label>Chicken Dish&nbsp;
            <input
                type="checkbox"
                name="chicken"
                checked={recipeDetails.chicken}
                onChange={inputChange}
            />&nbsp;
            </label>  

            <label>Beef Dish&nbsp;
            <input
                type="checkbox"
                name="beef"
                checked={recipeDetails.beef}
                onChange={inputChange}
            />&nbsp;
            </label>   
            
            <label>Pork Dish&nbsp;
            <input
                type="checkbox"
                name="pork"
                checked={recipeDetails.pork}
                onChange={inputChange}
            />&nbsp;
            </label>   
            <br/>
             <label>Fish Dish&nbsp;
            <input
                type="checkbox"
                name="fish"
                checked={recipeDetails.fish}
                onChange={inputChange}
            />&nbsp;
            </label>  

            <label>Vegetables&nbsp;
            <input
                type="checkbox"
                name="vegetables"
                checked={recipeDetails.vegetables}
                onChange={inputChange}
            />&nbsp;
            </label>  

            <label>Soup&nbsp;
            <input
                type="checkbox"
                name="soup"
                checked={recipeDetails.soup}
                onChange={inputChange}
            />&nbsp;
            </label>  

            <label>Dessert&nbsp;
            <input
                type="checkbox"
                name="dessert"
                checked={recipeDetails.dessert}
                onChange={inputChange}
            />&nbsp;
            </label> 
            <button>Update</button>   
        </div> */}
    </div>
    <button>Submit</button>
  </form>
  </div>
    )
}

export default UpdateRecipe;