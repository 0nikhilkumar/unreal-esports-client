import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: "user", //NOTE: default 'user' , 'host'
};

const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {

    login(state,action) {
      state.isLoggedIn = true;
      state.role = action.payload.role
    },

    logout(state) {
      state.isLoggedIn = false;
      state.role = ''
    },
  },
});

export const { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;
