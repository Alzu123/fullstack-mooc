import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import CountryDetails from './components/CountryDetails'

import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countrySearch, setCountrySearch ] = useState('')
  const [ showDetails, setShowDetails ] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setCountrySearch(event.target.value)
  }

  const showCountryDetails = (event) => {
    event.preventDefault()
    setCountrySearch(event.target.children[0].previousSibling.data)
  }

  const shownCountries = countries.filter(country => country.name.toLowerCase().includes(countrySearch.toLowerCase()))

  if (shownCountries.length === 1 && !showDetails) {
    setShowDetails(true)
  }

  if (shownCountries.length !== 1 && showDetails) {
    setShowDetails(false)
  }

  return (
    <div>
      find countries: 
      <input
        value={countrySearch}
        onChange={handleSearchChange}
      />
      {showDetails ?
      <CountryDetails country={shownCountries[0]} /> :
      <Countries countries={shownCountries} onSubmit={showCountryDetails} />
      } 
    </div>
  )

}

export default App
