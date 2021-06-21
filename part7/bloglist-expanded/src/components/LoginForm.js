import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { TextField, Button } from '@material-ui/core'

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
        <TextField
          id='username'
          name='username'
          label='Username'
        />
      </div>
      <div>
        <TextField
          id='password'
          name='password'
          label='Password'
          type='password'
        />
      </div>
      <Button variant='contained' type='submit' id='login-button'>Login</Button>
    </form>
  )
}

export default LoginForm