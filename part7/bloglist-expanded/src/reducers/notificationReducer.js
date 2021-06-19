const initialNotification = { message: '', isSuccess: null }

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { ...action }
  case 'RESET_NOTIFICATION':
    return initialNotification
  default:
    return state
  }
}

const timeoutIds = []

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      ...notification
    })

    for (let timeoutId of timeoutIds) {
      clearTimeout(timeoutId)
      timeoutIds.splice(0, 1)
    }

    timeoutIds.push(setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, seconds * 1000))
  }
}

export default notificationReducer