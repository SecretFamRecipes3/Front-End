import { axiosWithAuth } from "../utils/axiosWithAuth";

export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_LOGGED_OUT = "SET_LOGGED_OUT";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";

export const setLoggedIn = () => {
    return (dispatch) => {
        dispatch({ type: SET_LOGGED_IN });
        axiosWithAuth()
        .get('/users/user/{id}')
        .then(res => {
            console.log(res)
            dispatch({
                type: USER_SUCCESS
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
};

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
