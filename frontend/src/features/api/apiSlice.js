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
  tagTypes: ['Product', 'User', 'Order'],
  endpoints: build => ({
    getProducts: build.query({
      query: () => '/api/products',
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
      query: (id) => `/api/users/${id}`,
      providesTags: ['User']
    }),
    addOrder: build.mutation({
      query: (orderInfo) => ({
        url: '/api/orders',
        method: 'POST',
        body: orderInfo
      })
    }),
    getOrderById: build.query({
      query: (orderId) => `/api/orders/${orderId}`,
      providesTags: ['Order']
    }),
    updateOrderToPaid: build.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `/api/orders/${orderId}/pay`,
        method: 'PUT',
        body: paymentResult
      }),
      invalidatesTags: ['Order']
    }),
    getUserOrders: build.query({
      query: () => '/api/orders/my-orders',
      providesTags: ['Order']
    }),
    getAllUsers: build.query({
      query: () => '/api/users',
      providesTags: ['User']
    }),
    deleteUserById: build.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
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
  useGetOrderByIdQuery,
  useUpdateOrderToPaidMutation,
  useGetUserOrdersQuery,
  useGetAllUsersQuery,
  useDeleteUserByIdMutation
} = api