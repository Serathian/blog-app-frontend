import React from 'react'

const LoginForm = ({
  username,
  onUserNameChange,
  password,
  onPasswordChange,
  handleLogin,
}) => {
  return (
    <div id='loginForm'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={onUserNameChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={onPasswordChange}
          />
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

export default LoginForm
