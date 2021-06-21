import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LogoutForm = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <form onSubmit={handleLogout}>
      {user.name} logged in
      <button type='submit' id='logout-button'>logout</button>
    </form>
  )
}

export default LogoutForm