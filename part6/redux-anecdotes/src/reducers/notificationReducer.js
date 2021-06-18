const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return state = action.notification
    case 'RESET_NOTIFICATION':
      return state = ''
    default:
      return state
  }
}

export const setNotification = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const removeNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  }
}

export default notificationReducer