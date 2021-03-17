import React, { useEffect } from 'react'
import Blog from './Blog'
import { getAllBlogs } from '../../reducers/blogReducer'
import { connect } from 'react-redux'

const BlogList = ({ blogs, getAllBlogs }) => {
  useEffect(() => {
    getAllBlogs()
  }, [getAllBlogs])

  return (
    <div id='blogList'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

const mapDispatchToProps = {
  getAllBlogs,
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.allBlogs,
  }
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogList
