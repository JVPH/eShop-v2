import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : ''
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    savedPaymentMethod(state, action) {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
    }
  },
})

export const { savedPaymentMethod } = paymentSlice.actions

export default paymentSlice.reducer