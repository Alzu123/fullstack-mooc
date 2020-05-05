import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
  <div>
    <h1>
      {text}
    </h1>
  </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = (props) => {
  if (props.selected === -1) {
    return (null)
  }
  
  return (
    <div>
      <p>
        Votes: {props.votes[props.selected]}
      </p>
      <p>
        {props.anecdotes[props.selected]}
      </p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(-1)
  const [votes, setVotes] = useState( Array(anecdotes.length).fill(0) )

  const updateSelection = () => (Math.floor(Math.random() * anecdotes.length))
  const updateVotes = (votes, selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const indexOfMostVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <Button onClick={() => setSelected(updateSelection)} text={"Roll for new anecdote"} />
      <Button onClick={() => updateVotes(votes, selected)} text={"Vote for this anecdote"} />
      <Display selected={selected} anecdotes={anecdotes} votes={votes}/>
      <Header text={"Anecdote with the most votes"} />
      <Display selected={indexOfMostVotes} anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)