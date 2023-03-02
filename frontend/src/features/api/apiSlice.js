import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
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
    }),
    updateUserProfile: build.mutation({
      query: (updatedUserInfo) => ({
        url: '/api/users/profile',
        method: 'PUT',
        body: updatedUserInfo
      })
    }),
    getUserProfile: build.query({
      query: (id) => `/api/users/${id}`
    }),
    addOrder: build.mutation({
      query: (orderInfo) => ({
        url: '/api/orders',
        method: 'POST',
        body: orderInfo
      })
    }),
    getOrderById: build.query({
      query: (orderId) => `/api/orders/${orderId}`
    })
  })
})

export const { useGetProductsQuery,
  useGetProductByIdQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useAddOrderMutation,
  useGetOrderByIdQuery
} = api