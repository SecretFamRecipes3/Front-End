import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SingleRecipe from './SingleRecipe';
import styled from 'styled-components';

const StyledRecipe=styled.div`
border: 5px solid #89B0AE;
 border-radius: 30px;
 /* width: 40%; */
 width: auto;
 margin: 0 auto;
 padding-left: 4%;  
 padding-right: 4%;
 margin-bottom:4%;
 background-color:#FAF9F9;


 .editBtn{
  margin-left:35%;
  padding: 2%;
  margin-top:2%;
  margin-bottom:2%;
  background-color: #BEE3DB;
  border-radius: 10px;
 }

 .deleteBtn{
  margin-left:35%;
  padding: 2%;
  margin-top:2%;
  margin-bottom:2%;
  background-color: #BEE3DB;
  border-radius: 10px;
 }
`

const AllRecipes = (props) => {
    const [ userRecipes, setUserRecipes ] = useState([]);
    const [ show, setShow ] = useState(false);  

    const getRecipes = () => {
        axios.get('http://hsmm-secretfamilyrecipe.herokuapp.com/recipes/recipes')
        .then(res => {
          setUserRecipes(res.data)
        })
        .catch(err => {
          // debugger
          console.log(err)
        })
    }
        useEffect(() => {
      getRecipes()
    }, [])

    return (
      <>
        <div className="allRecipeList">
          {userRecipes.map((item) => {
          return (
            <SingleRecipe 
              key={item.recipeid}
              recipe={item}
            />
          )
        })}
        </div>
      </>
    )
}

export default AllRecipes;


// YOUR PREVIOUS CODE BELOW

// export default function Recipe({ details }) {
//   if (!details) {
//     return <h3>Working fetching your recipe&apos;s details...</h3>
//   }

////edit and delete recipe 

    //   const editRecipe = (id) => {
    //     axios.delete(`${quotesURL}/${id}`)
    //       .then(res => { // eslint-disable-line
    //         setQuotes(quotes.filter(quote => quote.id !== id))
    //       })
    //       .catch(handleError)
    //       .finally(resetForm)
    //   }
    
    
    //   const editRecipe = (id) => {
    //     const recipe = recipes.find(q => q.id === id)
    //     setFormRecipeValues({ ...recipe })

//   return (
//     <div className='recipes'>
//       <h2>{details.name}</h2>
//       <p>source: {details.source}</p>
//       <p>completion time: {details.time}</p>
//       <p>ingredients: {details.ingredients}</p>
//       <p>instructions: {details.instructions}</p>

//       {
//         !!details.category && !!details.category.length &&
//         <div>
//           Category:
//           <ul>
//             {details.category.map((like, idx) => <li key={idx}>{like}</li>)}
//           </ul>
//         </div>
//       }


// <button>Edit</button>
//     <button data-cy={`editBtn${i}`} onClick={() => editRecipe(q.id)}>Edit</button>
//     <button data-cy={`deleteBtn${i}`} onClick={() => deleteRecipe(q.id)}>Delete</button>
//     </div>
//   )
// }
