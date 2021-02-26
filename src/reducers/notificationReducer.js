const notificationReducer = (state = 'NONE', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return 'NONE'
    default:
      return state
  }
}
let currentTimeoutId
export const setNotification = (notification, timer) => {
  return async (dispatch) => {
    clearTimeout(currentTimeoutId)
    currentTimeoutId = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, timer * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',

      notification,
    })
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  }
}

export default notificationReducer
