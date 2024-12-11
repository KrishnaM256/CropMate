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
      invalidatesTags: ['Order'], // Ensures cache is invalidated after creation
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/get`,
        credentials: 'include',
      }),
      providesTags: ['Order'], // Allows cache tracking
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${ORDER_URL}/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Order'],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
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
} = ordersApiSlice
