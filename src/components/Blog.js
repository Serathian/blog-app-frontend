import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <h3>{blog.title}</h3>
    <p>
      {blog.author}
      <br />
      {blog.url}
      <br />
      {blog.likes}
    </p>
  </div>
)

export default Blog
