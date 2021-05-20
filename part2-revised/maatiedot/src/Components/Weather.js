import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState('')
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [apiKey, city])

  if (weather) {
    return (
      <div>
        <div><b>temperature:</b> {weather.current.temperature} celsius</div>
        <img src={weather.current.weather_icons[0]} alt={`Current weather in ${city}`}/>
        <div><b>wind:</b> {weather.current.wind_speed} kmh direction {weather.current.wind_dir}</div>
      </div>
    )
  } else {
    return 'Unable to load weather'
  }
}

export default Weather