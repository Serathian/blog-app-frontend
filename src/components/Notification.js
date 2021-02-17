import React from 'react'

const Notification = ({ notification }) => {
  if (notification === undefined) {
    return null
  }
  return (
    <div className={'error-' + notification.style}>{notification.message}</div>
  )
}
export default Notification
