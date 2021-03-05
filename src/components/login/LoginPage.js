import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NewUser from '../user/NewUser'
import LoginForm from './LoginForm'

const LoginPage = ({ isAuthUser }) => {
  if (isAuthUser === true) {
    return <Redirect to='/indexpage' />
  }
  return (
    <div className='loginPage'>
      <h4>Please login or create a new user</h4>
      <LoginForm />
      <NewUser />
    </div>
  )
}

const mapStateToProps = (props) => ({
  isAuthUser: props.curUser.isAuthUser,
})

export default connect(mapStateToProps)(LoginPage)
