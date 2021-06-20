import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = event => {
    event.preventDefault()

    dispatch(login(
      event.target.username.value,
      event.target.password.value
    ))
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="username"
          id="username-field"
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
          id="password-field"
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

export default LoginForm