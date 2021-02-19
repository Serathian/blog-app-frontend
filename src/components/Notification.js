import React from 'react'

const Notification = ({ notification }) => {
  if (notification.message === undefined) {
    return null
  }
  if (notification.style === 1) {
    return <div className={'error'}>{notification.message}</div>
  } else {
    return <div className={'success'}>{notification.message}</div>
  }
}
export default Notification
