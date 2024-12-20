import { BASE_URL, CHAT_URL } from '../constants'
import { apiSlice } from './apiSlice'

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ data, id }) => ({
        url: `${CHAT_URL}/send/${id}`,
        body: data,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Chat'],
    }),
    retrieveMessages: builder.query({
      query: (otherUserId) => ({
        url: `${CHAT_URL}/messages/${otherUserId}`,
        credentials: 'include',
      }),
    }),
    getChatUsers: builder.query({
      query: () => ({
        url: `${CHAT_URL}/users`,
        credentials: 'include',
      }),
    }),
    editMessage: builder.mutation({
      query: (data, id) => ({
        url: `${CHAT_URL}/edit/:${id}`,
        body: data,
        method: 'PUT',
        credentials: 'include',
      }),
      invalidatesTags: ['Chat'],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `${CHAT_URL}/delete/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Chat'],
    }),
    getMostRecentMessage: builder.query({
      query: (id) => ({
        url: `${CHAT_URL}/mostRecentMsg/${id}`,
        credentials: 'include',
      }),
    }),
  }),
})

export const {
  useDeleteMessageMutation,
  useEditMessageMutation,
  useGetChatUsersQuery,
  useSendMessageMutation,
  useRetrieveMessagesQuery,
  useGetMostRecentMessageQuery,
} = chatApiSlice
