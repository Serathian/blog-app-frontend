import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { getAllBlogs } from './reducers/blogReducer'
import { checkLocalStorageForUser, userLogout } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
//import Notification from './components/Notification'
import './App.css'

const App = (props) => {
  //gets all blogs on page rerender
  useEffect(() => {
    props.getAllBlogs()
  }, [])

  //get the user info from the localstore on each page rerender
  useEffect(() => {
    props.checkLocalStorageForUser()
  }, [])

  //References for our togglable components, loginFormRef is not in use.
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  //blogForm wrapped in togglable component
  const blogForm = () => (
    <Togglable
      defaultVisibility={false}
      buttonLabel='new blog'
      ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  //loginForm wrapped in togglable component
  const loginForm = () => (
    <Togglable defaultVisibility={true} buttonLabel='login' ref={loginFormRef}>
      <LoginForm />
    </Togglable>
  )

  return (
    <div>
      <h2> - The Blog Database - </h2>

      {props.user === null ? (
        <div>
          <h4>Login to see blog posts</h4>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>
            Welcome{' '}
            <strong>
              <i>{props.user.name}</i>
            </strong>{' '}
            you are logged in
            <button style={{ marginLeft: 10 }} onClick={props.userLogout}>
              logout
            </button>
          </p>
          {blogForm()}
          <BlogList />
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  getAllBlogs,
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
