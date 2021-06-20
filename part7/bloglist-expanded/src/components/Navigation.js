import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
  }

  const navBg = {
    background: 'Gainsboro'
  }

  const padding = {
    padding: 5
  }

  return (
    <form style={navBg} onSubmit={handleLogout}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name} logged in
      <button type='submit' id='logout-button'>logout</button>
    </form>
  )
}

export default Navigation