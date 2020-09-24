import React from 'react';

const Recipe = (props) => {
    const { item } = props;

    return(
        <div>
            {item.title}
        </div>
    )
}

export default Recipe;