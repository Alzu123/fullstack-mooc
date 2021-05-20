import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './Components/CountryList'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (event) => {
    event.preventDefault()
    setFilter(event.target.id)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      find countries
      <input onChange={handleFilterChange} value={filter} />
      <CountryList countries={countriesToShow} onClick={showCountry} />
    </div>
  )

}

export default App