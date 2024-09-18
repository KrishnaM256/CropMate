import { apiSlice } from './apiSlice'
import { ORDER_URL } from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/create`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Order'],
    }),

    createBuyerOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/createBuyerOrder`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Order'],
    }),

    getAllBuyerOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/getBuyerOrder`,
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/get`,
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),
  }),
})

export const {
  useCreateMutation,
  useCreateBuyerOrderMutation,
  useGetAllOrdersQuery,
  useGetAllBuyerOrdersQuery,
} = ordersApiSlice
