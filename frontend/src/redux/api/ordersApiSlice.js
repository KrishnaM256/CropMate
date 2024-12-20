import { apiSlice } from './apiSlice'
import { ORDER_URL } from '../constants'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/create`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Order'],
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/get`,
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/getMyOrders`,
        credentials: 'include',
      }),
      providesTags: ['Order'],
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/update/${data._id}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/delete/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
})

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetMyOrdersQuery,
} = ordersApiSlice
