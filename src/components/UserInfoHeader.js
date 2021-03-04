import React from 'react'
import { connect } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'

const UserInfoHeader = ({ user, userLogout }) => {
  if (user.isAuthUser === true) {
    return (
      <div className='userinfoHeader'>
        <h4>Welcome {user.name}</h4>
        <button onClick={userLogout}>Logout</button>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (props) => ({
  user: props.user,
})

const mapDispatchToProps = {
  userLogout,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoHeader)
