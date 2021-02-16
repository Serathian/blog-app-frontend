import React, { useState } from 'react'
import blogService from '../services/blogs'

const handleLikes = async (blog, getAllBlogs) => {
  console.log('handleLikes called')
  const blogObject = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }
  console.log('blogObject', blogObject)
  await blogService.update(blog.id, blogObject)
  getAllBlogs()
}

const handleDelete = async (blog, getAllBlogs) => {
  console.log('handleDelete called')
  if (window.confirm(`Remove ${blog.title}?`)) {
    await blogService.remove(blog.id)
    getAllBlogs()
  }
  return false
}

const Blog = ({ blog, getAllBlogs, userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const isDeleteable = { display: blog.user.id === userId ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <h3>
        {blog.title}
        <button style={hideWhenVisible} onClick={toggleVisibility}>
          View
        </button>
        <button style={showWhenVisible} onClick={toggleVisibility}>
          Hide
        </button>
      </h3>

      <div style={showWhenVisible}>
        <p>
          {blog.author}
          <br />
          {blog.url}
          <br />
          {blog.likes}{' '}
          <button onClick={() => handleLikes(blog, getAllBlogs)}>Like</button>
        </p>
        <button
          style={isDeleteable}
          onClick={() => handleDelete(blog, getAllBlogs)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Blog
