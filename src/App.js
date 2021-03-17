import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import AuthRoute from './routers/AuthRoute'
import Menu from './components/misc/Menu'
import UserInfoHeader from './components/user/UserInfoHeader'
import LoginPage from './components/login/LoginPage'
import IndexPage from './components/misc/IndexPage'
import BlogsPage from './components/blog/BlogsPage'
import BlogInfo from './components/blog/BlogInfo'
import UserList from './components/user/UserList'
import UserInfo from './components/user/UserInfo'
import './App.css'
import UserAccount from './components/user/UserAccount'

const App = () => {
  return (
    <Router>
      <Menu />
      <UserInfoHeader />
      <div className='container'></div>
      <Switch>
        <Route path='/loginpage' component={LoginPage} />
        <AuthRoute path='/indexpage' component={IndexPage} />
        <AuthRoute path='/blog/:id' component={BlogInfo} />
        <AuthRoute path='/blogs' component={BlogsPage} />
        <AuthRoute path='/user/:id' component={UserInfo} />
        <AuthRoute path='/users' component={UserList} />
        <AuthRoute path='/useraccount' component={UserAccount} />
        <Route path='/' render={() => <Redirect to='/indexpage' />} />
      </Switch>
    </Router>
  )
}

export default App
