import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RecipeForm from './RecipeForm';
import RecipeCard from './RecipeCard';
import UpdateRecipe from './UpdateRecipe';

const UserProfile = (props) => {
    const [ userRecipes, setUserRecipes ] = useState([])

    //this is calling for recipes from back-end
    useEffect(() => {
        axiosWithAuth()
        .get('/recipes/recipes')
        .then(res => {
            // console.log(res)
            setUserRecipes(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
 
    
    return (
    <>
        <div>
            <h1>My Recipes</h1>
            <p className='title'>Keep track of your family's favorites...</p>

                <div className="recipeContainer">
                {userRecipes.map((recipe) => {
                   return (<RecipeCard 
                        key={recipe.recipeid}
                        title={recipe.title}
                        source={recipe.source}
                        instruction={recipe.instruction}
                        recipe={recipe}
                        userRecipes={userRecipes}
                        setUserRecipes={setUserRecipes}
                    />)
                    })}
                </div>
                <RecipeForm/>
        </div>
    </>
    )
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    };
};


export default connect(mapStateToProps, {})(UserProfile);