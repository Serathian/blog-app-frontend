import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { addSingleComment } from '../../reducers/blogReducer'
import Togglable from '../misc/Togglable'

const CommentForm = ({ addSingleComment, blog }) => {
  const commentFormRef = useRef()
  const createComment = (event) => {
    const commentObject = {
      comment: event.target.comment.value,
    }
    addSingleComment(commentObject, blog.id)
    event.target.reset()
    commentFormRef.current.toggleVisibility()
  }

  return (
    <Togglable
      defaultVisibility={false}
      buttonLabel='new comment'
      ref={commentFormRef}>
      <div className='formDiv'>
        <form onSubmit={createComment}>
          <div>
            Comment:
            <input id='comment' style={{ marginLeft: 10 }} name='comment' />
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
  addSingleComment,
}

const mapStateToProps = (state) => {
  return {
    blog: state.blogs.singleBlog,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
