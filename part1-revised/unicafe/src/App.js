import React, { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const FeedbackButton = ({ handleClick, text }) => {
  return <button onClick={handleClick}>
    {text}
  </button>
}

const FeedbackCount = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const FeedbackStats = ({ good, neutral, bad }) => {
  return (
    <div>
      <FeedbackCount text='good' value={good} />
      <FeedbackCount text='neutral' value={neutral} />
      <FeedbackCount text='bad' value={bad} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <FeedbackButton handleClick={() => setGood(good + 1)} text='good' />
      <FeedbackButton handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <FeedbackButton handleClick={() => setBad(bad + 1)} text='bad' />
      
      <Header text='statistics' />
      <FeedbackStats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App