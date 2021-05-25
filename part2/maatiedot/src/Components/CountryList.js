import React from 'react'
import CountryDetails from './CountryDetails'

const CountryList = ({ countries, onClick }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length > 1) {
    return countries.map(country => 
      <div key={country.alpha3Code}>
        {country.name}
        <button type='submit' onClick={onClick} id={country.name}>show</button>
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return ''
}

export default CountryList