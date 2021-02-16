import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ getAllBlogs, showNotification, toggle }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    console.log(blogObject)
    const returnedBlog = await blogService.create(blogObject)

    getAllBlogs()
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

    //showNotification(`${returnedBlog.title} Successfully submitted`, 2)
    toggle()
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type='submit'>Save</button>
    </form>
  )
}

export default BlogForm
