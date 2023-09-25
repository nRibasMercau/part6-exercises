import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification', 
  initialState, 
  reducers: {
    createNotification(state, action) {
      return action.payload
    }
    /*
    setNotification(state, action) {
      const content = action.payload
      return content
    },
    removeNotification(state, action) {
        return initialState
    }
    */
  }
})

//export const { setNotification, removeNotification } = notificationSlice.actions

export const { createNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(createNotification(''))
    }, 1000 * timeout)
  }
}

export default notificationSlice.reducer
