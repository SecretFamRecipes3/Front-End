import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import { fetchRecipes } from '../actions/index';
import styled from 'styled-components'


const StyledProfile = styled.div`
 
h1,p{
    text-align:center;
    text-align:center;
}

.title {
    margin: auto;
}

.recipeComponent {
    margin-top: 5%;
}
`

const UserProfile = (props) => {
    const { fetchRecipes } = props;

    // GETTING RECIPES FROM BACK VIA ACTION/REDUCER
    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            <StyledProfile >
                <h1>My Recipes</h1>
                <p className='title'>Here you will find all of your family's favorites <br/> stored in one convenient location!</p>

                <div className="recipeComponent">
                    <RecipeList />
                </div>
                    <div className="recipeForm">
                        <RecipeForm />
                    </div>
                
            </StyledProfile>
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