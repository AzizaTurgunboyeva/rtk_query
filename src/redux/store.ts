// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../services";
import taskReducer from "../redux/taskSlice";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    tasks: taskReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});







