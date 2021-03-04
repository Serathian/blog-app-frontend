import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import AuthRoute from './routers/AuthRoute'
import Menu from './components/Menu'
import UserInfoHeader from './components/UserInfoHeader'
import LoginPage from './components/LoginPage'
import IndexPage from './components/IndexPage'
import BlogsPage from './components/BlogsPage'
import UserList from './components/UserList'
import './App.css'

const App = () => {
  return (
    <Router>
      <Menu />
      <UserInfoHeader />
      <div className='container'></div>
      <Route path='/loginpage' component={LoginPage} />
      <AuthRoute path='/indexpage' component={IndexPage} />
      <AuthRoute path='/blogs' component={BlogsPage} />
      <AuthRoute path='/users' component={UserList} />
      <Route path='/' render={() => <Redirect to='/indexpage' />} />
    </Router>
  )
}

export default App
