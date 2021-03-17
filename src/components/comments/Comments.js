import React from 'react'

const Comments = ({ comments }) => {
  if (comments === undefined || comments === null || comments.length === 0) {
    return <div>No comments found</div>
  } else {
    return (
      <div className='comments'>
        <ul>
          {comments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
