import { createSlice } from "@reduxjs/toolkit";

const initialDealerState = {
  token: null,
  userDetails: null,
};

export const authUserSlice = createSlice({
  name: "user",
  initialState: initialDealerState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      console.log("State after userToken:", state);
    },
    removeUserToken: (state) => {
      state.token = null;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    removeUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const {
  setUserToken,
  removeUserToken,
  setUserDetails,
  removeUserDetails,
} = authUserSlice.actions;

export default authUserSlice.reducer;
