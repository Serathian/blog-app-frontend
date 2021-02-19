import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationObject, setNotificationObject] = useState({})
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  useEffect(() => {
    getAllBlogs()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
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
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(window.localStorage.getItem('loggedBlogappUser'))
    showNotification('Logged out!', 1)
  }
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
  const handleDelete = async (blog) => {
    console.log('handleDelete called')
    if (window.confirm(`Remove ${blog.title}?`)) {
      await blogService.remove(blog.id)
      getAllBlogs()
      showNotification(`${blog.title} Deleted!`, 2)
    }
    return false
  }
  const addBlog = async (blogObject) => {
    await blogService.create(blogObject)
    showNotification(`"${blogObject.title}" has been created!`)
    getAllBlogs()
    blogFormRef.current.toggleVisibility()
  }
  const showNotification = (message, style) => {
    setNotificationObject({ message: message, style: style })
    setTimeout(() => {
      setNotificationObject({})
    }, 5000)
  }
  const blogFormRef = useRef()
  const loginFormRef = useRef()
  const blogForm = () => (
    <Togglable
      defaultVisibility={false}
      buttonLabel='new blog'
      ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )
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
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                userId={user.id}
                blog={blog}
                handleLikes={handleLikes}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
