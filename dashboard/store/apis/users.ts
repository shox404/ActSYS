// store/usersApi.ts
import { User } from "@/lib/types/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    saveUsers: builder.mutation<User[], { users: User[] }>({
      query: (body) => ({ url: "users", method: "POST", body }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useSaveUsersMutation } = usersApi;
