import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  const isVisible = notification.length > 0
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: isVisible ? '' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification