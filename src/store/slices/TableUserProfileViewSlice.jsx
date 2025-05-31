import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { TableUserProfileViewApi } from "@/api/Api";

const TableUserProfileViewSlice = createSlice({
  name: "TableUserProfileViewSlice",
  initialState: {
    UserTablePermissionViewisLoading: false,
    UserTablePermissionViewdata: null,
    UserTablePermissionViewisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(TableUserProfileViewApi.pending, (state, action) => {
      state.UserTablePermissionViewisLoading = true;
    });
    builder.addCase(TableUserProfileViewApi.fulfilled, (state, action) => {
      state.UserTablePermissionViewisLoading = false;
      state.UserTablePermissionViewdata = action.payload;
    });
    builder.addCase(TableUserProfileViewApi.rejected, (state, action) => {
      state.UserTablePermissionViewisLoading = false;
      state.UserTablePermissionViewisError = true;
    });
  },
});
export default TableUserProfileViewSlice.reducer;
