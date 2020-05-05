import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
  <div>
    <h1>
      {text}
    </h1>
  </div>
)

const Statistics = (props) => (
  <div>
    <p>
      Number of {props.name} feedback: {props.type}
    </p>
  </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGoodFeedback = () => setGood(good + 1)
  const incrementBadFeedback = () => setBad(bad + 1)
  const incrementNeutralFeedback = () => setNeutral(neutral + 1)

  return (
    <div>
      <Header text={"Give feedback for Unicafe!"} />
      <Button onClick={incrementGoodFeedback} text={"Good"} />
      <Button onClick={incrementBadFeedback} text={"Bad"} />
      <Button onClick={incrementNeutralFeedback} text={"Neutral"} />
      <Header text={"Statistics"} />
      <Statistics name={"good"} type={good} />
      <Statistics name={"bad"} type={bad} />
      <Statistics name={"neutral"} type={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)