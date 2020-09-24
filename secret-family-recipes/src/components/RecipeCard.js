import React from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { deleteRecipe } from '../actions/index';
import { connect } from 'react-redux';
 
const RecipeCard = (props) => {
    const { recipe, deleteRecipe } = props;
    const history = useHistory();

    // DELETE FUNCTION
    const handleDelete = evt => {
        evt.preventDefault();
        deleteRecipe(evt.target.id);
    };

    return (
        <>
            <div className='recipeCard'>
                <h4>{recipe.title}</h4>
                <h5>Source: {recipe.source}</h5>
                <h6>Prep Time: {recipe.preptime}</h6>
                <div>
                    <p style={{fontWeight:"bold"}}>Ingredients</p>
                        {recipe.ingredients.map((item) => {
                            return (
                                <div key={item.ingredient.ingredientid}>{item.ingredient.amount} {item.ingredient.name}</div>
                            )
                        })}
                </div>
                    <br/>
                <div className='instruction'>{recipe.instruction}</div>
                    <p style={{fontWeight:"bold"}}>Categories</p>
                        {recipe.categories.map((item)=>{
                            return(
                                <div key={item.category.categoryid}>{item.category.categoryname}</div>
                            )
                        })}
                <button onClick={() => history.push(`/update-recipe/${recipe.recipeid}`)}>Edit</button>
                <button id={recipe.recipeid} onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, { deleteRecipe })(RecipeCard);