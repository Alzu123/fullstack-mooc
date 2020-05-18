import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countrySearch, setcountrySearch ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setcountrySearch(event.target.value)
  }

  const shownCountries = countries.filter(country => country.name.toLowerCase().includes(countrySearch.toLowerCase()))

  const showDetails = shownCountries.length === 1
  console.log('showdetails', showDetails)

  return (
    <div>
      find countries: 
      <input
        value={countrySearch}
        onChange={handleSearchChange}
      />
      {showDetails ?
      <CountryDetails country={shownCountries[0]} /> :
      <Countries countries={shownCountries} />
      } 
    </div>
  )

}

export default App
