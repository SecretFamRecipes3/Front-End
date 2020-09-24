import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import { SET_USER_INFO } from '../actions';

import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/index';
import styled from 'styled-components'


const StyledProfile = styled.div`
 
h1,p{
    text-align:center;
    text-align:center;
}
`

const UserProfile = (props) => {
    //const [ userRecipes, setUserRecipes ] = useState([])
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const { fetchRecipes, loadingRecipes } = props;

    
    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    
    // GETTING RECIPES FROM BACKEND
    // const getRecipeList = () => {
    //     axios
    //     .get('http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipes')
    //     .then(res => {
    //         // console.log("the response from back", res)
    //         setUserRecipes(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    //     axiosWithAuth()
    //     .get('/users/userinfo')
    //     .then(res => {
    //         dispatch({ type: SET_USER_INFO, payload: res.data})
    //         // console.log(res)
    //     })
    // }

    // RESETS THE STATE WHEN NEW RECIPE IS ADDED *** needs something in dependency array so state is rerendered with the added recipe ***
    // useEffect(() => {
    //         getRecipeList();
    //     }, []);

    // useEffect(() => {
    //     axios
    //     .get('http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipes')
    //     .then(res => {
    //         // console.log("the response from back", res)
    //         setUserRecipes(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    //     axiosWithAuth()
    //     .get('/users/userinfo')
    //     .then(res => {
    //         dispatch({ type: SET_USER_INFO, payload: res.data})
    //         // console.log(res)
    //     })
    // }, [])
    // console.log('recipes inside profile', props.recipes)
    return (
        <>
            <StyledProfile >
                <h1>My Recipes</h1>
                <p className='title'>Here you will find all of your family's favorites <br/> stored in one convenient location!</p>

                <div>
                    <RecipeList />
                </div>

                {/* <div className="recipeContainer">
                    {!loadingRecipes ? (<RecipeList />) : (<div>Fetching Recipes...</div>)}
                </div> */}

                    {/* <div className="recipeContainer">
                        {userRecipes.map((recipe) => {
                        return (
                                <RecipeCard 
                                    key={recipe.recipeid}
                                    recipe={recipe}
                                    userRecipes={userRecipes}
                                    setUserRecipes={setUserRecipes}
                                />
                                )
                            })}
                    </div> */}
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