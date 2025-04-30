import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../types";

export const userDataAPi = createApi({
  reducerPath: "userDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://52.57.162.244:3005/" }),
  tagTypes: ["User"], // Add tag type for caching
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getOneUser: builder.query<IUser, string | number>({
      query: (id) => `users/${id}`,
      providesTags: ['User'],
    }),
    signUp: builder.mutation<IUser, Partial<IUser>>({
      query: (newUser) => ({
        url: "users/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      IUser,
      Partial<IUser> & { id: string | number }
    >({
      query: ({ id, ...updated }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: updated,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetOneUserQuery,
  useSignUpMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userDataAPi;

export default userDataAPi.reducer;
