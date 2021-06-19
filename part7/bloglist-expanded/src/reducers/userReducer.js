import loginService from '../services/login'

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
    console.log('set', user)
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )

    console.log('login', user)

    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT',
    })
  }
}

export default userReducer