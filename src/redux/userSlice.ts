// src/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUserId: string | null;
}

const initialState: UserState = {
  currentUserId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUserId: (state, action: PayloadAction<string | null>) => {
      state.currentUserId = action.payload;
    },
  },
});

export const { setCurrentUserId } = userSlice.actions;
export default userSlice.reducer;
