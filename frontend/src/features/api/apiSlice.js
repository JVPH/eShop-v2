import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    // prepareHeaders: (headers, )
  }),
  endpoints: build => ({
    getProducts: build.query({
      query: () => '/api/products'
    }),
    getProductById: build.query({
      query: productId => `/api/products/${productId}`
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: '/api/users/login',
        method: 'POST',
        body: credentials
      })
    }),
    register: build.mutation({
      query: (newUserInfo) => ({
        url: '/api/users',
        method: 'POST',
        body: newUserInfo
      })
    })


  })
})

export const { useGetProductsQuery, useGetProductByIdQuery, useLoginMutation, useRegisterMutation } = api