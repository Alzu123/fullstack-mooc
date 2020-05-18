import React from 'react'
import Languages from './Languages'

const CountryDetails = ({ country }) => {
    return (
      <div>
        <h1>{country.name}</h1>
        Capital: {country.capital}<br />
        Population: {country.population}

        <h2>Languages</h2>
        <Languages languages={country.languages}/>

        <img src={country.flag} alt={`Flag of ${country.name}`} height='200'/>
      </div>
    )
  }

export default CountryDetails