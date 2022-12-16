import { configureStore } from '@reduxjs/toolkit';
import { productApiSlice } from '../api/productApiSlice';
import { transactionApiSlice } from '../api/transactionApiSlice';
import { categoryApiSlice } from '../api/categoryApiSlice';


export const store = configureStore({
    reducer: {
        [productApiSlice.reducerPath]: productApiSlice.reducer,
        [transactionApiSlice.reducerPath]: transactionApiSlice.reducer,
        [categoryApiSlice.reducerPath]:
            categoryApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApiSlice.middleware, transactionApiSlice.middleware,
            categoryApiSlice.middleware),
});
