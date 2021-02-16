import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import './App.css'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState({})
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

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
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(window.localStorage.getItem('loggedBlogappUser'))
    showNotification('Logged out!', 1)
  }
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        getAllBlogs={getAllBlogs}
        showNotification={showNotification}
        toggle={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  )
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm setUser={setUser} showNotification={showNotification} />
    </Togglable>
  )
  const showNotification = (message, style) => {
    setErrorMessage({ message: message, style: style })
    setTimeout(() => {
      setErrorMessage(undefined)
    }, 5000)
  }

  return (
    <div>
      <div>
        <Notification errorMessage={errorMessage} />
      </div>
      <div>
        <h2>blogs</h2>

        {user === null ? (
          <div>
            {loginForm()}
            <h4>Login to see blog posts</h4>
          </div>
        ) : (
          <div>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            {blogForm()}
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  userId={user.id}
                  blog={blog}
                  getAllBlogs={getAllBlogs}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
