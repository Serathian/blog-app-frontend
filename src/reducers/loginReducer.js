import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return { ...user, isAuthUser: true }
  } else {
    return { isAuthUser: false }
  }
}

const loginReducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.data, isAuthUser: true }
    /*     case 'SET_USER':
      return { ...action.data, isAuthUser: true } */
    case 'LOGOUT':
      return { isAuthUser: false }
    default:
      return state
  }
}
export const userLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

/* export const checkLocalStorageForUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'SET_USER',
      data: user,
    }
  }
}
 */
export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return {
    type: 'LOGOUT',
  }
}
export default loginReducer
