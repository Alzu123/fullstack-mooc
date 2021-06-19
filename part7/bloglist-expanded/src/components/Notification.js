import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const isVisible = notification.message.length > 0
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: isVisible ? '' : 'none'
  }

  const notificationType = notification.isSuccess ? 'notification' : 'notification warning'

  return (
    <div className={notificationType} style={style}>
      {notification.message}
    </div>
  )

}


export default Notification