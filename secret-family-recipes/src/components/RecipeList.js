
import React from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard';

function RecipeList(props) {
    // const { recipes } = props;

    return(
        <>
        <div>
            {props.recipes.map((recipeItem) => {
                return <RecipeCard key={recipeItem.id} recipe={recipeItem} />
            })}
        </div>
        </>
    )
}

function mapStateToProps(state){
    return{
       recipes: state.recipes,
    };
}

export default connect(mapStateToProps, {})(RecipeList);
