import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AllGroupPermissionViewApi } from "@/api/Api";

const GroupAllUserProfileViewSlice = createSlice({
  name: "GroupAllUserProfileViewSlice",
  initialState: {
    AllGroupPermissionViewisLoading: false,
    AllGroupPermissionViewdata: null,
    AllGroupPermissionViewisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllGroupPermissionViewApi.pending, (state, action) => {
      state.AllGroupPermissionViewisLoading = true;
    });
    builder.addCase(AllGroupPermissionViewApi.fulfilled, (state, action) => {
      state.AllGroupPermissionViewisLoading = false;
      state.AllGroupPermissionViewdata = action.payload;
    });
    builder.addCase(AllGroupPermissionViewApi.rejected, (state, action) => {
      state.AllGroupPermissionViewisLoading = false;
      state.AllGroupPermissionViewisError = true;
    });
  },
});
export default GroupAllUserProfileViewSlice.reducer;
