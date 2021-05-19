import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Weather = ({ capital }) => {
  const [ weather, setWeather ] = useState([])

  useEffect(() => {

    const params = {
      access_key: process.env.REACT_APP_WEATHER_API_KEY,
      query: capital,
      units: 'm'
    }

    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data.current)
      })
  }, [capital])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <b>Temperature:</b> {weather.temperature} °C
      </p>
      <img src={weather.weather_icons} alt={`Weather in ${capital}`} height='100'/>
      <p>
        <b>Wind:</b> {weather.wind_speed} km/h in direction {weather.wind_dir}
      </p>
    </div>
  )
}

export default Weather