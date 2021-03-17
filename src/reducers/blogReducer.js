import blogService from '../services/blogs'

const blogReducer = (state = { allBlogs: [], singleBlog: {} }, action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return { ...state, allBlogs: [...state.allBlogs, action.data] }
    case 'LIKE_BLOG':
      const updatedBlog = { ...state.singleBlog, likes: action.data.likes }
      return { ...state, singleBlog: updatedBlog }
    case 'DELETE_BLOG':
      const deleteBlogId = action.data
      return {
        ...state,
        allblogs: state.allBlogs.filter((blog) => blog.id !== deleteBlogId),
        singleBlog: {},
      }
    case 'ALL_BLOG':
      return { ...state, allBlogs: action.data }
    case 'SINGLE_BLOG':
      return { ...state, singleBlog: action.data }
    default:
      return state
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

export const getSingleBlog = (id) => {
  return async (dispatch) => {
    const singleBlog = await blogService.getOne(id)
    dispatch({
      type: 'SINGLE_BLOG',
      data: singleBlog,
    })
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
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export const addSingleComment = (comment, blogId) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.addComment(blogId, comment)
    console.log('Returned Blogs: ', returnedBlog)
    dispatch({
      type: 'ADD_COMMENT',
      data: returnedBlog,
    })
  }
}

export default blogReducer
