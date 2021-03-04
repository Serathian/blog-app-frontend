import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import LoginForm from './LoginForm'

const LoginPage = ({ isAuthUser }) => {
  if (isAuthUser === true) {
    return <Redirect to='/indexpage' />
  }
  return (
    <div className='loginPage'>
      <h4>Please login to use the blogs database</h4>
      <LoginForm />
    </div>
  )
}

const mapStateToProps = (props) => ({
  isAuthUser: props.user.isAuthUser,
})

export default connect(mapStateToProps)(LoginPage)
