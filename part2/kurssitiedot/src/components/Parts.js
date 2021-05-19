import React from 'react'

const Parts = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
      </div>
    )
  }

export default Parts