import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AllNewConnectionViewApi } from "@/api/Api";

const AllNewConnectionViewSlice = createSlice({
  name: "AllNewConnectionViewSlice",
  initialState: {
    AllNSCViewisLoading: false,
    AllNSCViewdata: null,
    AllNSCViewisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllNewConnectionViewApi.pending, (state, action) => {
      state.AllNSCViewisLoading = true;
    });
    builder.addCase(AllNewConnectionViewApi.fulfilled, (state, action) => {
      state.AllNSCViewisLoading = false;
      state.AllNSCViewdata = action.payload;
    });
    builder.addCase(AllNewConnectionViewApi.rejected, (state, action) => {
      state.AllNSCViewisLoading = false;
      state.AllNSCViewisError = true;
    });
  },
});
export default AllNewConnectionViewSlice.reducer;
