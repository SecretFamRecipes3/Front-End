import { ADD_RECIPE } from '../actions/recipeActions';
import { FETCH_RECIPES_SUCCESS, FETCH_RECIPES, FETCH_A_RECIPE, DELETE_RECIPE, PUT_RECIPE } from '../actions/index';

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
    recipe: {},
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
        case FETCH_A_RECIPE:
            return {
                ...state,
                recipe: action.payload,
            }
        case DELETE_RECIPE: 
            return {
                ...state,
                recipes: [...state.recipes.filter(item => item.id !== action.payload.id)]
            }
        case PUT_RECIPE: 
            return {
                ...state,
                recipes: state.recipes.map((item) =>{
                //    debugger // if(item.recipeid != action.payload[0]){
            if(item.recipeid != action.payload.recipeid){
                        // console.log(action.payload[1]) 
                    console.log(action.payload)
                    return action.payload
                        // return item
                    } else {
                        return item
                    }
                })
            }
    default:
        return state;
    }
}

export default recipeReducer;