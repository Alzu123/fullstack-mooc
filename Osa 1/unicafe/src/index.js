import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
  <div>
    <h1>
      {text}
    </h1>
  </div>
)

const Statistics = ({ good, bad, neutral }) => {
  const totalFeedback = good + bad + neutral
  if (totalFeedback === 0) {
    return (
      <div>
        <p>
          No feedback yet received.
        </p>
      </div>
    )
  }

  const averageFeedback = (good - bad) / totalFeedback
  const positiveProportion = good / totalFeedback * 100
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine description={"Good:"} value={good} />
          <StatisticLine description={"Neutral:"} value={neutral} />
          <StatisticLine description={"Bad:"} value={bad} />
          <StatisticLine description={"All:"} value={totalFeedback} />
          <StatisticLine description={"Average:"} value={averageFeedback} />
          <StatisticLine description={"Positive:"} value={positiveProportion} unit={"%"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ description, value, unit }) => (
  <tr>
    <td>
      {description}
    </td>
    <td>
      {value} {unit}
    </td>
  </tr>
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
      <Button onClick={incrementNeutralFeedback} text={"Neutral"} />
      <Button onClick={incrementBadFeedback} text={"Bad"} />
      <Header text={"Statistics"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)