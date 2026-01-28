import type { User } from "@/lib/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    checkAuth: builder.query<User, void>({
      query: () => "/me",
      providesTags: ["Auth"],
    }),

    requestCode: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: "/request-code",
        method: "POST",
        body,
      }),
    }),

    verifyCode: builder.mutation<User, { email: string; code: string }>({
      query: (body) => ({
        url: "/verify-code",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useRequestCodeMutation,
  useVerifyCodeMutation,
  useLogoutMutation,
} = authApi;
