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
  }),
})

export const { useCreateContractMutation } = contractApiSlice
