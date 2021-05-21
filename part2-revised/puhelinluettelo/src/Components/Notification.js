import React from 'react'

const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  }

  const notificationType = isSuccess ? 'notification' : 'notification warning'

  return (
    <div className={notificationType}>
      {message}
    </div>
  )
}

export default Notification