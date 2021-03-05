import userService from '../services/users'

const usersReducer = (state = { userList: [], singleUser: {} }, action) => {
  switch (action.type) {
    case 'POPULATE_USERS':
      return { ...state, userList: action.data }
    case 'SINGLE_USER':
      return { ...state, singleUser: action.data }
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    const response = await userService.getAll()
    dispatch({
      type: 'POPULATE_USERS',
      data: response,
    })
  }
}

export const getUser = (id) => {
  return async (dispatch) => {
    const response = await userService.getUser(id)
    dispatch({
      type: 'SINGLE_USER',
      data: response,
    })
  }
}

export default usersReducer
