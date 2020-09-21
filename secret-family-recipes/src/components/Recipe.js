import React from 'react'

export default function Recipe({ details }) {
  if (!details) {
    return <h3>Working fetching your recipe&apos;s details...</h3>
  }

  return (
    <div className='recipes'>
      <h2>{details.name}</h2>
      <p>source: {details.source}</p>
      <p>completion time: {details.time}</p>
      <p>ingredients: {details.ingredients}</p>
      <p>instructions: {details.instructions}</p>

      {
        !!details.category && !!details.category.length &&
        <div>
          Category:
          <ul>
            {details.category.map((like, idx) => <li key={idx}>{like}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}
