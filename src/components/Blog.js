import React, { useState } from 'react'

const Blog = ({ blog, userId, handleLikes, handleDelete }) => {
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
  const isDeleteable = {
    display: blog.user.id === userId ? '' : 'none',
  }

  return (
    <div className='blog' style={blogStyle}>
      <div className='blogBasicInfo'>
        <h3 style={{ margin: 5 }} className='blogTitle'>
          {blog.title}

          <button style={hideWhenVisible} onClick={toggleVisibility}>
            View
          </button>
          <button style={showWhenVisible} onClick={toggleVisibility}>
            Hide
          </button>
        </h3>
        <h5 style={{ margin: 5 }} className='blogAuthor'>
          by: {blog.author}
        </h5>
      </div>
      <div className='blogMoreInfo' style={showWhenVisible}>
        <ul>
          <li id='url'>URL: {blog.url}</li>
          <li id='likes'>Likes: {blog.likes}</li>
        </ul>
        <button id='likeButton' onClick={() => handleLikes(blog)}>
          Like
        </button>

        <button
          style={isDeleteable}
          id='deleteButton'
          onClick={() => handleDelete(blog)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default Blog
