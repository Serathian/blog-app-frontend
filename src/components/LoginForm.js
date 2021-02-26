import React from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'

const LoginForm = (props) => {
  const handleLogin = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    props.userLogin(username, password)
  }
  return (
    <div id='loginForm'>
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e)}>
        <div>
          username
          <input id='username' type='text' name='Username' />
        </div>
        <div>
          password
          <input id='password' type='password' name='Password' />
        </div>
        <div>
          <button id='login-button' type='submit'>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  userLogin,
}

const mapStateToProps = (state) => {
  return {}
}

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
export default ConnectedLoginForm
