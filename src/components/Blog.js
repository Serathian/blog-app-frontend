import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeSingleBlog, deleteSingleBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, likeSingleBlog, deleteSingleBlog }) => {
  //default css style provided by course material
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
  //boolean - is the user the owner of the blog post
  const isDeleteable = {
    display: blog.user.id === user.id ? '' : 'none',
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
        <button id='likeButton' onClick={() => likeSingleBlog(blog)}>
          Like
        </button>

        <button
          style={isDeleteable}
          id='deleteButton'
          onClick={() => deleteSingleBlog(blog.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  likeSingleBlog,
  deleteSingleBlog,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default ConnectedBlog
