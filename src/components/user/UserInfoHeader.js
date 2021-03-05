import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../../reducers/loginReducer'

const UserInfoHeader = ({ user, userLogout }) => {
  if (user.isAuthUser === true) {
    return (
      <div className='userinfoHeader'>
        <h4>
          Welcome <Link to='/useraccount'>{user.name}</Link>{' '}
        </h4>
        <button onClick={userLogout}>Logout</button>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (props) => ({
  user: props.curUser,
})

const mapDispatchToProps = {
  userLogout,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoHeader)
