import { ADD_RECIPE } from '../actions/recipeActions';
import { FETCH_RECIPES_SUCCESS, FETCH_RECIPES } from '../actions/index';

const ingredientsObj = {
    // ingredientid: 42,
    name: '',
    amount: '',
}

const categoriesObj = {
  // categoryid: 56,
  categoryname: '',
}

const initialRecipe = {
    title: "",
    source: "",
    preptime: "", 
    ingredients: [ingredientsObj],
    categories: [categoriesObj],
    instruction: "",
}

export const initialState = {
    recipes: [],
    loadingRecipes: false,
};


export const recipeReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_RECIPE:
            return {
                ...state, 
                title: state.title,
                source: state.source,
                ingredients: [...state.ingredients],
                instruction: state.instruction
            }
        case FETCH_RECIPES:
            return {
                ...state,
                loadingRecipes: true
            }
        case FETCH_RECIPES_SUCCESS: 
            return {
                ...state,
                recipes: action.payload,
                loadingRecipes: false
            }
    default:
        return state;
    }
}

export default recipeReducer;
