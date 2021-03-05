import React from 'react'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const BlogsPage = () => {
  return (
    <div className='blogsPage'>
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default BlogsPage
