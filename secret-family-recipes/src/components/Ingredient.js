import React from 'react';

const Ingredient = (props) => {
    const { item, index } = props
    return (
        <>
            <div>
                {item}
            </div>
        </>
    )
}

export default Ingredient;