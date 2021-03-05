import React from 'react'
import { connect } from 'react-redux'

const UserAccount = ({ curUser }) => {
  console.log('current user: ', curUser)
  return (
    <div>
      <ul>
        <li>Name: {curUser.name}</li>
        <li>Username: {curUser.username}</li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    curUser: state.curUser,
  }
}
export default connect(mapStateToProps)(UserAccount)
