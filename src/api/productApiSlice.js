import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApiSlice = createApi({
    reducerPath: 'productApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ page, size, category, productName }) => {
                console.log('asu page : ', page);
                console.log('asu size : ', size);
                console.log('asu category : ', category);
                return `api/products?page=${page + 1}&size=${size}&category=${category}`
            },
            providesTags: ['Products'],
        }),

        getProductsDetail: builder.query({
            query: (id) => `api/products/detail/${id}`,
            providesTags: ['Products'],
        }),


        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: 'api/products/create',
                method: 'POST',
                body: newProduct,
            }),
            invalidatesTags: ['Products'],
        }),

        updateProduct: builder.mutation({
            query: (updateProduct) => ({
                url: `api/products/update/${updateProduct.id}`,
                method: 'PATCH',
                body: updateProduct,
            }),
            invalidatesTags: ['Products'],
        }),


        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `api/products/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),

    }),
})

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useGetProductsDetailQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApiSlice
