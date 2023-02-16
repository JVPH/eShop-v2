import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),
  endpoints: build => ({
    getProducts: build.query({
      query: () => '/api/products'
    }),
    getProductById: build.query({
      query: productId => `/api/products/${productId}`
    })
  })
})

export const { useGetProductsQuery, useGetProductByIdQuery } = api