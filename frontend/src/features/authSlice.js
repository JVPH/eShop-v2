import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  token: localStorage.getItem('userToken')
    ? JSON.parse(localStorage.getItem('userToken'))
    : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action){
      const { token, ...userInfo } = action.payload
      state.token = token
      state.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      localStorage.setItem('userToken', JSON.stringify(token))
    },
    removedCredentials(state){
      state.userInfo = null
      state.token = null
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
    }
  }

})

export const { setCredentials, removedCredentials } = authSlice.actions

export default authSlice.reducer