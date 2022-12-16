import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApiSlice = createApi({
    reducerPath: 'categoryApiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ({ page, size, search }) => {
                return `api/categories?page=${page + 1}&size=${size}&search=${search}`
            },
            providesTags: ['Categories'],
        }),

        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: 'api/categories/create',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['Categories'],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `api/categories/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categories'],
        })


    }),

})

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApiSlice