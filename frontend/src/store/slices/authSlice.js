import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: "",
  user_name: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeAuthState: (state, action) => {
      state.user_name = action.payload.user_name;
      state.user_id = action.payload.user_id;
    },
    clearAuthState: (state) => {
      state.user_name = "";
      state.user_id = "";
    },
  },
});

export const { changeAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
