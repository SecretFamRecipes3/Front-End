import React from 'react';
import { connect } from 'react-redux';
// import action function to axios.get recipes

import RecipeForm from './RecipeForm';

const UserProfile = (props) => {

    // this is where I'll do axios.get for recipes from back-end
    
    return (
    <>
        <div>
            <h1>My Recipes</h1>
                <RecipeForm/>
            {!props.loggedIn ? (
                // if loggedIn, show recipes
                <div></div>
            ) : (
            <div>
                Must be logged in to view your recipes</div>
                )}


            <div className="recipeContainer">
                <div className="recipeCard">
                    <h3>Best Brownies</h3>
                    <h4>Ingredients</h4>
                    <ul>
                        <li>butter</li>
                        <li>sugar</li>
                        <li>eggs</li>
                    </ul>
                    <h4>Directions</h4>
                    <ol>
                        <li>Preheat oven to 350 degrees.</li>
                        <li>Mix dry ingredients.</li>
                        <li>Bake for 25-30 minutes.</li>
                    </ol>
                </div>
                <div className="recipeCard">
                    <h3>Best Brownies</h3>
                    <h4>Ingredients</h4>
                    <ul>
                        <li>butter</li>
                        <li>sugar</li>
                        <li>eggs</li>
                    </ul>
                    <h4>Directions</h4>
                    <ol>
                        <li>Preheat oven to 350 degrees.</li>
                        <li>Mix dry ingredients.</li>
                        <li>Bake for 25-30 minutes.</li>
                    </ol>
                </div>
                <div className="recipeCard">
                    <h3>Best Brownies</h3>
                    <h4>Ingredients</h4>
                    <ul>
                        <li>butter</li>
                        <li>sugar</li>
                        <li>eggs</li>
                    </ul>
                    <h4>Directions</h4>
                    <ol>
                        <li>Preheat oven to 350 degrees.</li>
                        <li>Mix dry ingredients.</li>
                        <li>Bake for 25-30 minutes.</li>
                    </ol>
                </div>
            </div>
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