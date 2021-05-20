import React from 'react'
import Weather from './Weather'

const CountryDetails = ({ country }) => {

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>

      <h3>languages</h3>
      <ul>
        {country.languages.map(language => 
          <li key={language.iso639_2}>
            {language.name}
          </li>
        )}
      </ul>

      <img src={country.flag} height={200} alt={`${country.name} flag`}/>

      <h3>Weather in {country.capital}</h3>
      <Weather city={country.capital} />

    </div>
  )
}

export default CountryDetails