import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const createBlogObject = (event) => {
    event.preventDefault()
    console.log('createBlogObject called')
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    addBlog(blogObject)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div className='formDiv'>
      <form onSubmit={createBlogObject}>
        <div>
          Title:
          <input
            id='title'
            style={{ marginLeft: 10 }}
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            style={{ marginLeft: 10 }}
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id='url'
            style={{ marginLeft: 10 }}
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button style={{ margin: 5 }} type='submit'>
          Save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
