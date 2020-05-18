import React from 'react'
import Languages from './Languages'
import Weather from './Weather'

const CountryDetails = ({ country, api_key }) => (
    <div>
      <h1>{country.name}</h1>
      Capital: {country.capital}<br />
      Population: {country.population}

      <h2>Languages</h2>
      <Languages languages={country.languages}/>

      <img src={country.flag} alt={`Flag of ${country.name}`} height='200'/>
      
      <Weather capital={country.capital} api_key={api_key} />
    </div>
  )

export default CountryDetails