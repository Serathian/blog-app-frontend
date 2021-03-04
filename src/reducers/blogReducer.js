import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      const likeBlogId = action.data.id
      const blogToUpdate = state.find((b) => b.id === likeBlogId)
      const updatedBlog = { ...blogToUpdate, likes: action.data.likes }
      return state.map((blog) => (blog.id !== likeBlogId ? blog : updatedBlog))
    case 'DELETE_BLOG':
      const deleteBlogId = action.data
      return state.filter((blog) => blog.id !== deleteBlogId)
    case 'ALL_BLOG':
      return action.data
    default:
      return state
  }
}

export const addSingleBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlogId = await blogService.create(blogObject)
    const newBlog = await blogService.getOne(newBlogId)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeSingleBlog = (blog) => {
  const blogObject = { ...blog, likes: blog.likes + 1, user: blog.user.id }
  return async (dispatch) => {
    const returnedBlog = await blogService.update(blog.id, blogObject)
    dispatch({
      type: 'LIKE_BLOG',
      data: returnedBlog,
    })
  }
}

export const deleteSingleBlog = (id) => {
  return async (dispatch, BlogId) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export const getAllBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll()
    dispatch({
      type: 'ALL_BLOG',
      data: allBlogs,
    })
  }
}
export default blogReducer
