import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';


export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_LOGGED_OUT = "SET_LOGGED_OUT";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";

export const SET_USER_INFO = "SET_USER_INFO";
export const FETCH_RECIPES = "FETCH_RECIPES";
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const FETCH_A_RECIPE = "FETCH_A_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const PUT_RECIPE = "PUT_RECIPE";

export const fetchRecipes = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_RECIPES });
        axios
        .get('http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipes')
        .then(res => {
            // console.log('fetch recipes data', res.data)
            dispatch({
                type: FETCH_RECIPES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const fetchArecipe = (recipeData) => {
    return(dispatch) => {
        axiosWithAuth()
        .post('/recipes/recipe', recipeData)
        .then(res => {
          dispatch({ 
              type: FETCH_A_RECIPE, 
              payload: res.data
            })
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
}


export const deleteRecipe = (id) => {
    return(dispatch) => {
        axiosWithAuth()
        .delete(`http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipe/${id}`)
        .then(res => {
            // console.log(res)
            // dispatch({ 
            //     type: DELETE_RECIPE,
            //     payload: res.data
            // })
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const putRecipe = (id, newData, editData) => dispatch => {
    // debugger
    axiosWithAuth()
        .put(`/recipes/recipe/${id}`, newData)
        .then(res => {
            console.log(res) // -- do FIRST
            dispatch({ 
                type: PUT_RECIPE, 
                payload: editData
                // payload: [id, newData]
                // payload: res.data -- IMP!
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const setLoggedOut = () => {
    return (dispatch) => {
        dispatch({ type: SET_LOGGED_OUT });
        axiosWithAuth()
        .get('/logout')
        .then(res => {
            console.log(res)
            dispatch({
                type: USER_LOGOUT
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
};

