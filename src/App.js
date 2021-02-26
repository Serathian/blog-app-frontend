import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'

import { getAllBlogs } from './reducers/blogReducer'

//#region COMPONENT IMPORTS
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
//#endregion
//#region SERVICES IMPORTS
import blogService from './services/blogs'
import loginService from './services/login'
//#endregion

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationObject, setNotificationObject] = useState({})
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  //gets all blogs on page rerender
  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch])

  //get the user info from the localstore on each page rerender
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //logs the user in via the loginService and saves it to the local store
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification(`${user.name} successfully logged in!`, 2)
    } catch (exception) {
      showNotification('Wrong credentials', 1)
    }
  }

  //logs the user out and removes the local stores
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(window.localStorage.getItem('loggedBlogappUser'))
    showNotification('Logged out!', 1)
  }

  //updates a blog using blogService with a new blog object
  //with an addition to the likes variable
  const handleLikes = async (blog) => {
    console.log('handleLikes called')
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    await blogService.update(blog.id, blogObject)
    getAllBlogs()
    showNotification(`${blog.title} Liked!`, 2)
  }

  //deletes a blog using the blogService, shows a notification if successful
  const handleDelete = async (blog) => {
    console.log('handleDelete called')
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(blog.id)
      getAllBlogs()
      showNotification(`${blog.title} Deleted!`, 2)
    }
    return false
  }

  //adds a blog using the blogService, shows a notification if successful
  const addBlog = async (blogObject) => {
    await blogService.create(blogObject)
    showNotification(`"${blogObject.title}" has been created!`)
    getAllBlogs()
    blogFormRef.current.toggleVisibility()
  }

  //notification method updates the notification state
  const showNotification = (message, style) => {
    setNotificationObject({ message: message, style: style })
    setTimeout(() => {
      setNotificationObject({})
    }, 5000)
  }

  //References for our togglable components, loginFormRef is not in use.
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  //blogForm wrapped in togglable component
  const blogForm = () => (
    <Togglable
      defaultVisibility={false}
      buttonLabel='new blog'
      ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  //loginForm wrapped in togglable component
  const loginForm = () => (
    <Togglable defaultVisibility={true} buttonLabel='login' ref={loginFormRef}>
      <LoginForm
        username={username}
        onUserNameChange={({ target }) => setUsername(target.value)}
        password={password}
        onPasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
        setPasswordsetUser={setUser}
        showNotification={showNotification}
      />
    </Togglable>
  )

  return (
    <div>
      <h2> - The Blog Database - </h2>
      <Notification notification={notificationObject} />
      {user === null ? (
        <div>
          <h4>Login to see blog posts</h4>
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>
            Welcome{' '}
            <strong>
              <i>{user.name}</i>
            </strong>{' '}
            you are logged in
            <button style={{ marginLeft: 10 }} onClick={handleLogout}>
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

export default App
