import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  ad_details: null,
  user: null,
  _id: null,
  success: null,
  superAdminDetails: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setUserId: (state, action) => {
      state._id = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
    superAdminDetails: (state, action) => {
      state.superAdminDetails = action.payload;
    },
  },
});

export const {
  setUserId,
  setToken,
  removeToken,
  setUser,
  superAdminDetails,
  removeUser,
  setSuccess,
  removeSuccess,
} = authSlice.actions;

export default authSlice.reducer;
