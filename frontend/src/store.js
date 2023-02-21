import { configureStore } from '@reduxjs/toolkit'
// import productListSlice  from './features/productSlice'

import { api } from './features/api/apiSlice'
import cartReducer from './features/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})