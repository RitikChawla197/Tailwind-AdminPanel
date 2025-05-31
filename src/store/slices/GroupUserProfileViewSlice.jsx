import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { GroupUserProfileViewApi } from "@/api/Api";

const GroupUserProfileViewSlice = createSlice({
  name: "GroupUserProfileViewSlice",
  initialState: {
    GroupUserProfileViewisLoading: false,
    GroupUserProfileViewdata: null,
    GroupUserProfileViewisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GroupUserProfileViewApi.pending, (state, action) => {
      state.GroupUserProfileViewisLoading = true;
    });
    builder.addCase(GroupUserProfileViewApi.fulfilled, (state, action) => {
      state.GroupUserProfileViewisLoading = false;
      state.GroupUserProfileViewdata = action.payload;
    });
    builder.addCase(GroupUserProfileViewApi.rejected, (state, action) => {
      state.GroupUserProfileViewisLoading = false;
      state.GroupUserProfileViewisError = true;
    });
  },
});
export default GroupUserProfileViewSlice.reducer;
