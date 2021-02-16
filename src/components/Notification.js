import React from 'react'

const Notification = ({ message, style }) => {
  if (message === undefined) {
    return null
  }
  return <div className={'error-' + style}>{message}</div>
}
export default Notification
