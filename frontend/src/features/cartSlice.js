import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addedToCart(state, action){
      const product  = action.payload

      const itemIndex = state.cartItems.findIndex((item) => item._id === product._id)

      if(itemIndex >= 0){
        if (state.cartItems[itemIndex].qty + product.qty > state.cartItems[itemIndex].countInStock){
          state.cartItems[itemIndex].qty = state.cartItems[itemIndex].countInStock
        }else {
          state.cartItems[itemIndex].qty += product.qty
        }
      }else {
        state.cartItems.push(product)
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    updatedQuantity(state, action){
      const { productId, qty } = action.payload
      const itemIndex = state.cartItems.findIndex((item) => item._id === productId)
      state.cartItems[itemIndex].qty = qty
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removedFromCart(state, action){
      const id = action.payload
      const itemIndex = state.cartItems.findIndex((item) => item._id === id)
      state.cartItems.splice(itemIndex, 1)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
  }
})

export const { addedToCart, updatedQuantity, removedFromCart } = cartSlice.actions

export default cartSlice.reducer