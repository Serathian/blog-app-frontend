import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return
    case 'LIKE_BLOG':
      return
    case 'DELETE_BLOG':
      return
    case 'ALL_BLOG':
      console.log('Reducer called ALL_BLOG', action.data)
      return action.data
    default:
      return state
  }
}
export const likeSingleBlog = () => {}

export const deleteSingleBlog = () => {}

export const getAllBlogs = () => {
  console.log('getAllBlogs called in reducer')
  return async (dispatch) => {
    const allBlogs = await blogService.getAll()
    console.log('GAB - allBlogs: ', allBlogs)
    dispatch({
      type: 'ALL_BLOG',
      data: allBlogs,
    })
  }
}
export default blogReducer
