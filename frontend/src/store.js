import { configureStore } from '@reduxjs/toolkit'
// import productListSlice  from './features/productSlice'

import { api } from './features/api/apiSlice'
import cartReducer from './features/cartSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})