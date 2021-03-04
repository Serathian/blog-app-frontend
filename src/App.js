import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { checkLocalStorageForUser, userLogout } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import './App.css'

const App = ({ checkLocalStorageForUser, user, userLogout }) => {
  //get the user info from the localstore on each page rerender
  useEffect(() => {
    checkLocalStorageForUser()
  }, [checkLocalStorageForUser])

  return (
    <div>
      <h2> - The Blog Database - </h2>

      {user === null ? (
        <div>
          <h4>Login to see blog posts</h4>
          <LoginForm />
        </div>
      ) : (
        <div>
          <p>
            Welcome{' '}
            <strong>
              <i>{user.name}</i>
            </strong>{' '}
            you are logged in
            <button style={{ marginLeft: 10 }} onClick={userLogout}>
              logout
            </button>
          </p>
          <BlogForm />
          <BlogList />
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  checkLocalStorageForUser,
  userLogout,
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
