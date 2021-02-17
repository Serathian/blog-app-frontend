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
  const [notificationObject, setNotificationObject] = useState({})
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
    //Missing the show notification as it throws a error
    getAllBlogs()
    blogFormRef.current.toggleVisibility()
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm setUser={setUser} showNotification={showNotification} />
    </Togglable>
  )

  const showNotification = (message, style) => {
    setNotificationObject({ message: message, style: style })
    setTimeout(() => {
      setNotificationObject(undefined)
    }, 5000)
  }

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
