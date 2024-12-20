import { apiSlice } from './apiSlice'
import { CONTRACT_URL } from '../constants'

const contractApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContract: builder.mutation({
      query: (data) => ({
        url: `${CONTRACT_URL}/create`,
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Contract'],
    }),
    acceptContract: builder.mutation({
      query: ({ id, data }) => ({
        url: `${CONTRACT_URL}/accept/${id}`,
        body: data,
        method: 'POST',
        credentials: 'include', // Ensure credentials are included if required
      }),
      invalidatesTags: ['Contract'], // Invalidate cache for "Contract" after mutation
    }),
    getContractByOrderId: builder.query({
      query: (orderId) => ({
        url: `${CONTRACT_URL}/getContractByOrderId?orderId=${orderId}`,
        credentials: 'include',
      }),
    }),
    updateContract: builder.mutation({
      query: (data) => ({
        url: `${CONTRACT_URL}/update`,
        body: data,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: ['Contract'],
    }),
    deleteContract: builder.mutation({
      query: (id) => ({
        url: `${CONTRACT_URL}/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Contract'],
    }),
  }),
})

export const {
  useCreateContractMutation,
  useAcceptContractMutation,
  useGetContractByOrderIdQuery,
  useUpdateContractMutation,
  useDeleteContractMutation,
} = contractApiSlice
