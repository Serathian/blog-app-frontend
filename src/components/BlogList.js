import React, { useEffect } from 'react'
import { getAllBlogs } from '../reducers/blogReducer'
import Blog from '../components/Blog'
import { likeSingleBlog, deleteSingleBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const BlogList = ({
  blogs,
  getAllBlogs,
  likeSingleBlog,
  deleteSingleBlog,
  user,
}) => {
  useEffect(() => {
    getAllBlogs()
  }, [getAllBlogs])

  const handleLikes = (blog) => {
    likeSingleBlog(blog)
  }

  const handleDelete = (blogId) => {
    deleteSingleBlog(blogId)
  }

  return (
    <div id='blogList'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            userId={user.id}
            blog={blog}
            handleLikes={handleLikes}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  )
}

const mapDispatchToProps = {
  likeSingleBlog,
  deleteSingleBlog,
  getAllBlogs,
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogList
