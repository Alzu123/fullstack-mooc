import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  })

  const isVisible = notification.length > 0
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: isVisible ? '' : 'none'
  }
  return (
    <div style={style}>
      you voted '{notification}'
    </div>
  )
}

export default Notification