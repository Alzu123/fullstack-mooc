import React from 'react'

const Languages = ({ languages }) => {
  return (
    <div>
      <ul>
        {languages.map((language, index) =>
        <li key={index}>
          {language.name}
        </li>)}
      </ul>
    </div>
  )
}

export default Languages