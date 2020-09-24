import React,{ useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

import styled from 'styled-components'


const StyledRecipe=styled.div`
border: 5px solid #89B0AE;
 border-radius: 30px;
 width: 40%;
 margin: 0 auto;
 padding-left: 4%;  
 padding-right: 4%;
 margin-bottom:4%;
 background-color:#FAF9F9;

 .editBtn{
  margin-left:35%;
  padding: 2%;
  margin-top:2%;
  margin-bottom:2%;
  background-color: #BEE3DB;
  border-radius: 10px;
 }
`





const RecipeCard = (props) => {
    const { recipe } = props;
    const history = useHistory();



    // DELETE FUNCTION works when userRecipes is inside dependency array in UserProfile useEffect
    // doesn't work when the dependency array is empty
    // const handleDelete = evt => {
    //     evt.preventDefault();
    //     axiosWithAuth()
    //     .delete(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${recipe.recipeid}`)
    //     .then(res => {
    //         // setUserRecipes(userRecipes); use .filter to filter out id's 
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
    // };

    return (
        <>
            <StyledRecipe className='recipeCard'>
                <h2>{recipe.title}</h2>
                <h3>Source: {recipe.source}</h3>
                <h3>Prep Time: {recipe.preptime}</h3>
                <div>
                    <h3 className= 'ingredients'>Ingredients:</h3>
                        {recipe.ingredients.map((item) => {
                            return (
                                <ul>
                                <li key={item.ingredient.ingredientid}>{item.ingredient.amount} {item.ingredient.name} </li>
                                </ul>
                            )
                        })}
                </div>
                    <br/>
                <div className='instruction'>{recipe.instruction}</div>
                    <h3 >Categories:</h3>
                        {recipe.categories.map((item)=>{
                            return(
                                <div key={item.category.categoryid}>{item.category.categoryname}</div>
                            )
                        })}
                <button className ='editBtn' onClick={() => history.push(`/update-recipe/${recipe.recipeid}`)}>Edit</button>
                {/* <button onClick={handleDelete}>Delete</button> */}
            </StyledRecipe>
        </>
    )
}


export default RecipeCard;