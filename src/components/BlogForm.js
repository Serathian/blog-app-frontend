import React from 'react'
import { connect } from 'react-redux'
import { addSingleBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {
  const createBlogObject = (event) => {
    event.preventDefault()
    console.log('createBlogObject called')
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    props.addSingleBlog(blogObject)
  }

  return (
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
  )
}
const mapDispatchToProps = {
  addSingleBlog,
}

const mapStateToProps = (state) => {
  return {}
}

const ConnectedBlogForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)
export default ConnectedBlogForm
