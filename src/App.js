import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import './App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    const returnedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(returnedBlog))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

    showNotification(`${returnedBlog.title} Successfully submitted`, 2)
  }
  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(window.localStorage.getItem('loggedBlogappUser'))
    showNotification('Logged out!', 1)
  }
  const Notification = ({ errorMessage }) => {
    if (errorMessage === undefined) {
      return null
    }
    return (
      <div className={'error-' + errorMessage.style}>
        {errorMessage.message}
      </div>
    )
  }
  const showNotification = (message, style) => {
    setErrorMessage({ message: message, style: style })
    setTimeout(() => {
      setErrorMessage(undefined)
    }, 5000)
  }
  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm
        onSubmit={addBlog}
        blogTitle={newBlogAuthor}
        blogAuthor={newBlogTitle}
        blogUrl={newBlogUrl}
        handleBlogTitleChange={handleBlogTitleChange}
        handleBlogAuthorChange={handleBlogAuthorChange}
        handleBlogUrlChange={handleBlogUrlChange}
      />
    </Togglable>
  )
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm setUser={setUser} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>

      {user === null ? (
        (console.log('Before: ', user),
        loginForm(),
        console.log('After: ', user))
      ) : (
        <div>
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
        </div>
      )}

      <Notification errorMessage={errorMessage} />
      <div></div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
