import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { addRecipe } from '../actions/recipeActions';

import RecipeForm from './RecipeForm';
import RecipeCard from './RecipeCard';

const UserProfile = (props) => {
    const [ userRecipes, setUserRecipes ] = useState([])

    //this is calling for recipes from back-end
    useEffect(() => {
        axios
        .get('http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipes')
        .then(res => {
            console.log("the response from back", res)
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
                        recipe={recipe}
                        userRecipes={userRecipes}
                        setUserRecipes={setUserRecipes}
                    />)
                    })}
                </div>
                <RecipeForm />
        </div>
    </>
    )
}

export default UserProfile;