// src/slices/taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITasks } from "../types";

interface TaskState {
  selectedTaskId: string | null;
  localTasks: ITasks[]; 
}

const initialState: TaskState = {
  selectedTaskId: null,
  localTasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setSelectedTaskId: (state, action: PayloadAction<string | null>) => {
      state.selectedTaskId = action.payload;
    },
    addLocalTask: (state, action: PayloadAction<ITasks>) => {
      state.localTasks.push(action.payload);
    },
    removeLocalTask: (state, action: PayloadAction<string>) => {
      state.localTasks = state.localTasks.filter(
        (task) => task._id !== action.payload
      );
    },
    updateLocalTask: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const task = state.localTasks.find((t) => t._id === action.payload.id);
      if (task) task.title = action.payload.title;
    },
  },
});

export const {
  setSelectedTaskId,
  addLocalTask,
  removeLocalTask,
  updateLocalTask,
} = taskSlice.actions;

export default taskSlice.reducer;
