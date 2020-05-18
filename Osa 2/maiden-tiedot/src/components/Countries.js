import React from 'react'

const Countries = ({ countries }) => {
  const tooManyCountries = countries.length > 10

  if (tooManyCountries) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  } else {
    return (
      <div>
        {countries.map(country => 
        <p key={country.name}>
          {country.name}
        </p>)}
      </div>
    )}
  }

export default Countries