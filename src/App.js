import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { checkLocalStorageForUser, userLogout } from './reducers/loginReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  Redirect,
} from 'react-router-dom'

const App = ({ checkLocalStorageForUser, user, userLogout }) => {
  //get the user info from the localstore on each page rerender
  useEffect(() => {
    checkLocalStorageForUser()
  }, [checkLocalStorageForUser])

  return (
    <div>
      <Menu />
      <h2> - The Blog Database - </h2>

      {user === null ? (
        <Redirect to='/login' />
      ) : (
        /* <div>
          <h4>Login to see blog posts</h4>
          <LoginForm />
        </div> */
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
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/blogs'>
          <BlogList />
        </Route>
        <Route path='/users'>
          <UserList />
        </Route>
      </Switch>
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
