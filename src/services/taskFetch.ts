import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITasks, IUsers } from "../types";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://52.57.162.244:3005/" }),
  tagTypes: ["Todo", "User"],
  endpoints: (builder) => ({
    getTodos: builder.query<ITasks[], void>({
      query: () => "todo",
      providesTags: ["Todo"],
    }),

    getTodoById: builder.query<ITasks, string>({
      query: (id) => `todo/${id}`,
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation<ITasks, { title: string }>({
      query: (newTodo) => ({
        url: "todo",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<ITasks, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo/${id}`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodoCompleted: builder.mutation<
      ITasks,
      { id: string; isCompleted: boolean }
    >({
      query: ({ id, isCompleted }) => ({
        url: `todo/complete/${id}`,
        method: "PATCH",
        body: { isCompleted },
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    // USERS (new)
    getUsers: builder.query<IUsers[], void>({
      query: () => "users", // Adjust based on your backend route
      providesTags: ["User"],
    }),
    addUser: builder.mutation<IUsers, Partial<IUsers>>({
      query: (newUser) => ({
        url: "users/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    getOneUser: builder.query<IUsers, string>({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IUsers, { id: string; body: Partial<IUsers> }>(
      {
        query: ({ id, body }) => ({
          url: `users/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["User"],
      }
    ),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoCompletedMutation,
  useDeleteTodoMutation,
  useAddUserMutation,
  useGetOneUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = todoApi;
