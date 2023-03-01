import { configureStore } from '@reduxjs/toolkit'
// import productListSlice  from './features/productSlice'

import { api } from './features/api/apiSlice'
import cartReducer from './features/cartSlice'
import authReducer from './features/authSlice'
import shippingReducer from './features/shippingSlice'
import paymentReducer from  './features/paymentSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    shipping: shippingReducer,
    payment: paymentReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})