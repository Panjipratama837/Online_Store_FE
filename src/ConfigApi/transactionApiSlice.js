import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const transactionApiSlice = createApi({
    reducerPath: 'transactionApiSlice',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Transactions'],
    endpoints: (builder) => ({

        getTransactions: builder.query({
            query: () => '/api/findall',
            providesTags: ['Transactions'],
        }),




    }),
})

export const {
    useGetTransactionsQuery,
} = transactionApiSlice
