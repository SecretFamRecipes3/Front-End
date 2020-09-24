import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';


export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_LOGGED_OUT = "SET_LOGGED_OUT";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";

export const SET_USER_INFO = "SET_USER_INFO";
export const FETCH_RECIPES = "FETCH_RECIPES";
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";

export const fetchRecipes = () => {
    return (dispatch) => {
        // dispatch({ type: FETCH_RECIPES });
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

