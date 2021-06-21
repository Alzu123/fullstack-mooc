import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const setUser = user => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setNotification({ message: 'Logged in.', isSuccess: true }, 5))
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch({
        type: 'SET_USER',
        user
      })
    } catch (error) {
      dispatch(setNotification({ message: 'Wrong username or password.', isSuccess: false }, 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(setNotification({ message: 'Logged out.', isSuccess: true }, 5))
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default userReducer