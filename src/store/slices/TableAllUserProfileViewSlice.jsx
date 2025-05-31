import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AllTablePermissionViewApi } from "@/api/Api";

const TableAllUserProfileViewSlice = createSlice({
  name: "TableAllUserProfileViewSlice",
  initialState: {
    AllTablePermissionViewisLoading: false,
    AllTablePermissionViewdata: null,
    AllTablePermissionViewisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllTablePermissionViewApi.pending, (state, action) => {
      state.AllTablePermissionViewisLoading = true;
    });
    builder.addCase(AllTablePermissionViewApi.fulfilled, (state, action) => {
      state.AllTablePermissionViewisLoading = false;
      state.AllTablePermissionViewdata = action.payload;
    });
    builder.addCase(AllTablePermissionViewApi.rejected, (state, action) => {
      state.AllTablePermissionViewisLoading = false;
      state.AllTablePermissionViewisError = true;
    });
  },
});
export default TableAllUserProfileViewSlice.reducer;
