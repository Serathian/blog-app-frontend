import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { addSingleBlog } from '../../reducers/blogReducer'
import Togglable from '../misc/Togglable'

const BlogForm = ({ addSingleBlog }) => {
  const blogFormRef = useRef()
  const createBlogObject = (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    addSingleBlog(blogObject)
    event.target.reset()
    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable
      defaultVisibility={false}
      buttonLabel='new blog'
      ref={blogFormRef}>
      <div className='formDiv'>
        <form onSubmit={createBlogObject}>
          <div>
            Title:
            <input id='title' style={{ marginLeft: 10 }} name='title' />
          </div>
          <div>
            Author:
            <input id='author' style={{ marginLeft: 10 }} name='author' />
          </div>
          <div>
            Url:
            <input id='url' style={{ marginLeft: 10 }} name='url' />
          </div>
          <button style={{ margin: 5 }} type='submit'>
            Save
          </button>
        </form>
      </div>
    </Togglable>
  )
}
const mapDispatchToProps = {
  addSingleBlog,
}

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm
