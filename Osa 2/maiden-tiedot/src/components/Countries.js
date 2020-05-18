import React from 'react'
import Country from './Country'

const Countries = ({ countries, onSubmit }) => {
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
        <Country key={country.name} country={country} onSubmit={onSubmit} />)}
      </div>
    )}
  }

export default Countries