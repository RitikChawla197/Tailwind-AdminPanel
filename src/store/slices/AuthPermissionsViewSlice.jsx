import React from 'react'
import { createSlice } from '@reduxjs/toolkit';
import { AuthPermissionsViewApi } from "@/api/Api";

const AuthPermissionsViewSlice = createSlice({
    name: "AuthPermissionsViewSlice",
    initialState: {
        AuthPermissionsisLoading: false,
        AuthPermissionsdata: null,
        AuthPermissionsisError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(AuthPermissionsViewApi.pending, (state, action) => {
        state.AuthPermissionsisLoading = true;
      });
      builder.addCase(AuthPermissionsViewApi.fulfilled, (state, action) => {
        state.AuthPermissionsisLoading = false;
        state.AuthPermissionsdata = action.payload;
      });
      builder.addCase(AuthPermissionsViewApi.rejected, (state, action) => {
        state.AuthPermissionsisLoading = false;
        state.AuthPermissionsisError = true;
      });
    },
  });
  export default AuthPermissionsViewSlice.reducer;