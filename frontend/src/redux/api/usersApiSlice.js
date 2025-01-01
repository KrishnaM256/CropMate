import { apiSlice } from './apiSlice'
import { BASE_URL, USERS_URL } from '../constants'

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
        credentials: 'include',
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
    createGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createGroup`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    addToGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addToGroup`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getAllGroups: builder.query({
      query: () => ({
        url: `${USERS_URL}/getAllGrps`,
        credentials: 'include',
      }),
    }),
    removeMemberGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/removeMember`,
        method: 'DELETE',
        body: data,
        credentials: 'include',
      }),
    }),
    deleteGroup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deleteGroup`,
        method: 'DELETE',
        body: data,
        credentials: 'include',
      }),
    }),
    removeSavedOrder: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/removeSavedOrder`,
        method: 'DELETE',
        body: data,
        credentials: 'include',
      }),
    }),
    updateGroupName: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateGroupName`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
    }),
    createSavedOrders: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createSavedOrders`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getAllSavedOrders: builder.query({
      query: () => ({
        url: `${USERS_URL}/getAllSavedOrders`,
        credentials: 'include',
      }),
    }),
    getCountsData: builder.query({
      query: () => ({
        url: `${USERS_URL}/getCounts`,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useCreateGroupMutation,
  useAddToGroupMutation,
  useCreateSavedOrdersMutation,
  useDeleteGroupMutation,
  useGetAllGroupsQuery,
  useGetAllSavedOrdersQuery,
  useRemoveMemberGroupMutation,
  useRemoveSavedOrderMutation,
  useUpdateGroupNameMutation,
  useGetCountsDataQuery,
} = usersApiSlice
