import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import { fetchRecipes } from '../actions/index';


const UserProfile = (props) => {
    const { fetchRecipes, loadingRecipes } = props;

    // GETTING RECIPES FROM BACK VIA ACTION/REDUCER
    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            <div>
                <h1>My Recipes</h1>
                <p className='title'>Keep track of your family's favorites...</p>

                <div>
                    <RecipeList />
                </div>
                    <div className="recipeForm">
                        <RecipeForm />
                    </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes,
        loadingRecipes: state.loadingRecipes,
    }
}

export default connect(mapStateToProps, { fetchRecipes })(UserProfile);