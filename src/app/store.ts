import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        // [accountsApi.reducerPath]: accountsApi.reducer,
        // [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
