import React from 'react'

const NoteForm = (
  onSubmit,
  handleBlogAuthorChange,
  handleBlogTitleChange,
  handleBlogUrlChange,
  blogTitle,
  blogAuthor,
  blogUrl
) => {
  return (
    <form onSubmit={() => onSubmit}>
      <div>
        Title:
        <input value={blogTitle} onChange={() => handleBlogTitleChange} />
      </div>
      <div>
        Author:
        <input value={blogAuthor} onChange={() => handleBlogAuthorChange} />
      </div>
      <div>
        Url:
        <input value={blogUrl} onChange={() => handleBlogUrlChange} />
      </div>
      <button type='submit'>Save</button>
    </form>
  )
}

export default NoteForm
