import { configureStore } from '@reduxjs/toolkit'
// import productListSlice  from './features/productSlice'

import { api } from './features/api/apiSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})