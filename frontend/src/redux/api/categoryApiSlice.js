import { apiSlice } from './apiSlice'
import { CATEGORY_URL } from '../constants'

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: 'POST',
        body: newCategory,
        credentials: 'include',
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: 'PUT',
        body: updatedCategory,
        credentials: 'include',
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    getCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`,
    }),
  }),
})

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} = categoryApiSlice
