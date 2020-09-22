import { SET_LOGGED_IN, SET_LOGGED_OUT, USER_SUCCESS, USER_LOGOUT } from '../actions/index';

export const initialState = {
    loggedIn: false,
    user: {
        username: " ",
        password: " ",
        email: " "
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_LOGGED_IN: 
        return {
            ...state,
            loggedIn: true,
        };
        case SET_LOGGED_OUT:
            return {
                ...state,
                loggedIn: false,
            }
        case USER_SUCCESS: 
        return {
            ...state,
            loggedIn: true,
            user: action.payload
        }
        case USER_LOGOUT: 
        return {
            ...state,
            loggedIn: false,
        }
        default: 
        return state;
    }
}