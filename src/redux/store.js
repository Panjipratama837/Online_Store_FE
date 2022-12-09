import { configureStore } from '@reduxjs/toolkit';
import { productApiSlice } from '../api/productApiSlice';
import { transactionApiSlice } from '../api/transactionApiSlice';


export const store = configureStore({
    reducer: {
        [productApiSlice.reducerPath]: productApiSlice.reducer,
        [transactionApiSlice.reducerPath]: transactionApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApiSlice.middleware, transactionApiSlice.middleware),
});
