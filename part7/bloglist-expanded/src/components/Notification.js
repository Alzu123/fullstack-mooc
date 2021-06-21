import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.message
  const severity = notification.isSuccess ? 'success' : 'error'

  return (
    <div>
      {(message &&
        <Alert severity={severity}>
          {message}
        </Alert>
      )}
    </div>
  )
}


export default Notification