import { apiSlice } from './apiSlice'
import { USERS_URL } from '../constants'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/userProfile/${id}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    // profile: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: 'GET',
    //     body: data,
    //     credentials: 'include',
    //   }),
    // }),
    // getUsers: builder.query({
    //   query: () => ({
    //     url: `${USERS_URL}/usersList`,
    //     credentials: 'include',
    //   }),
    //   providesTags: ['User'],
    //   keepUnusedDataFor: 5,
    // }),
    // deleteUser: builder.mutation({
    //   query: (userId) => ({
    //     url: `${USERS_URL}/admin/${userId}`,
    //     method: 'DELETE',
    //     credentials: 'include',
    //   }),
    // }),
    // getUserDetails: builder.query({
    //   query: (userId) => ({
    //     url: `${USERS_URL}/admin/${userId}`,
    //     credentials: 'include',
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice
