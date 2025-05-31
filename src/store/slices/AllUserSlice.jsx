import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { AllUserApi } from "../../api/Api";

const AllUserSlice = createSlice({
  name: "AllUserSlice",
  initialState: {
    AllUserisLoading: false,
    AllUserdata: null,
    AllUserisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AllUserApi.pending, (state, action) => {
      state.AllUserisLoading = true;
    });
    builder.addCase(AllUserApi.fulfilled, (state, action) => {
      state.AllUserisLoading = false;
      state.AllUserdata = action.payload;
    });
    builder.addCase(AllUserApi.rejected, (state, action) => {
      state.AllUserisLoading = false;
      state.AllUserisError = true;
    });
  },
});
export default AllUserSlice.reducer;
