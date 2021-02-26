import React from 'react'
import Blog from '../components/Blog'
import { likeSingleBlog, deleteSingleBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const BlogList = (props) => {
  const handleLikes = (blog) => {
    props.likeSingleBlog(blog)
  }
  const handleDelete = (blogId) => {
    props.deleteSingleBlog(blogId)
  }

  return (
    <div id='blogList'>
      {props.blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            //userId={user.id}
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
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)

export default ConnectedBlogList
