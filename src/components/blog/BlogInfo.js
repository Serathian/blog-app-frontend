import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import {
  getSingleBlog,
  likeSingleBlog,
  deleteSingleBlog,
} from '../../reducers/blogReducer'
import Comments from '../comments/Comments'
import CommentForm from '../comments/CommentsForm'

const BlogInfo = ({
  currentUser,
  blog,
  getSingleBlog,
  likeSingleBlog,
  deleteSingleBlog,
}) => {
  const match = useRouteMatch('/blog/:id')
  const id = match.params.id
  useEffect(() => {
    getSingleBlog(id)
  }, [getSingleBlog, id])

  if (blog === null) {
    return <div>Blog not found</div>
  } else if (blog.id === id) {
    console.log(blog)
    return (
      <div className='blog'>
        <div className='blogBasicInfo'>
          <h2 style={{ margin: 5 }} className='blogTitle'>
            {blog.title}
          </h2>
          <h5 style={{ margin: 5 }} className='blogDetails'>
            {blog.url}
            <br />
            Author: {blog.author}
            <br />
            Likes: {blog.likes}
            <button
              style={{ marginLeft: 5 }}
              id='likeButton'
              onClick={() => likeSingleBlog(blog)}>
              Like
            </button>
            <br />
            Added by: {blog.user.name}
          </h5>
          <h4>Comments</h4>
          <Comments comments={blog.comments} />
          <CommentForm />
        </div>
        <button
          style={{ display: blog.user.id === currentUser.id ? '' : 'none' }}
          id='deleteButton'
          onClick={() => {
            deleteSingleBlog(blog.id)
          }}>
          Delete
        </button>
      </div>
    )
  } else {
    return <div>Blog not found</div>
  }
}

const mapStateToProps = (state) => {
  return {
    blog: state.blogs.singleBlog,
    currentUser: state.curUser,
  }
}

const mapDispatchToProps = { getSingleBlog, likeSingleBlog, deleteSingleBlog }
export default connect(mapStateToProps, mapDispatchToProps)(BlogInfo)
