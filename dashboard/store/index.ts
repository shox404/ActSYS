import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth";
import authReducer from "@/store/slices/auth"
import { usersApi } from "./apis/users";
import usersReducer from "@/store/slices/users"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        users: usersReducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        usersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
