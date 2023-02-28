import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}
}

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setShippingAddress(state, action){
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))
    }
  },
})

export const { setShippingAddress } = shippingSlice.actions

export default shippingSlice.reducer