import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeCard = (props) => {
    const { title, source, recipe, instruction, userRecipes, setUserRecipes } = props
    const history = useHistory();
    const { id } = useParams();

    const handleDelete = evt => {
        evt.preventDefault();
        axios
        .delete(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${recipe.recipeid}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        });
    };

    return (
        <>
        <div className='recipeCard'>
            <h4>{title}</h4>
            <h5>Source: {source}</h5>
            <div>
                <p style={{fontWeight:"bold"}}>Ingredients</p>
                {recipe.ingredients.map((item) => {
                    return (
                        <div key={item.ingredient.ingredientid}>{item.ingredient.name} {item.ingredient.amount}</div>
                    )
                })}
            </div>
                <br/>
            <div className='instruction'>{instruction}</div>
            <button onClick={() => history.push(`/update-recipe/${recipe.recipeid}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
       
        </>
    )
}

export default RecipeCard;