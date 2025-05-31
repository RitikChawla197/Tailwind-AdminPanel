import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AllEnvironmentApi } from "@/api/Api";


const AllEnvironmentsSlice = createSlice({
  name: "AllEnvironmentsSlice",
  initialState: {
    AllEnvironmentsisLoading: false,
    AllEnvironmentsdata: null,
    AllEnvironmentsisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllEnvironmentApi.pending, (state, action) => {
      state.AllEnvironmentsisLoading = true;
    });
    builder.addCase(AllEnvironmentApi.fulfilled, (state, action) => {
      state.AllEnvironmentsisLoading = false;
      state.AllEnvironmentsdata = action.payload;
    });
    builder.addCase(AllEnvironmentApi.rejected, (state, action) => {
      state.AllEnvironmentsisLoading = false;
      state.AllEnvironmentsisError = true;
    });
  },
});
export default AllEnvironmentsSlice.reducer;
