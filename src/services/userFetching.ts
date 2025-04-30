import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUsers } from "../types"; // Assuming you use this type somewhere

export const userDataAPi = createApi({
  reducerPath: "userDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://52.57.162.244:3005/" }),
  tagTypes: ["User"], // Add tag type for caching
  endpoints: (builder) => ({
    getUsers: builder.query<IUsers[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    getOneUser: builder.query<IUsers, string | number>({
      query: (id) => `users/${id}`,
      providesTags: ['User'],
    }),
    signUp: builder.mutation<IUsers, Partial<IUsers>>({
      query: (newUser) => ({
        url: "users/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<
      IUsers,
      Partial<IUsers> & { id: string | number }
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
