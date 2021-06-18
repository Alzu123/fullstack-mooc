import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(anecdote.content))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return(
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(a => a.content.includes(filter))
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList