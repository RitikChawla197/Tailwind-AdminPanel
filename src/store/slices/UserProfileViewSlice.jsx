import React from 'react'
import { createSlice } from '@reduxjs/toolkit';
import { UserProfileView } from '../../api/Api';

const UserProfileViewSlice = createSlice({
    name: "UserProfileViewSlice",
    initialState: {
      UserProfileViewisLoading: false,
      UserProfileViewdata: null,
      UserProfileViewisError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(UserProfileView.pending, (state, action) => {
        state.UserProfileViewisLoading = true;
      });
      builder.addCase(UserProfileView.fulfilled, (state, action) => {
        state.UserProfileViewisLoading = false;
        state.UserProfileViewdata = action.payload;
      });
      builder.addCase(UserProfileView.rejected, (state, action) => {
        state.UserProfileViewisLoading = false;
        state.UserProfileViewisError = true;
      });
    },
  });
  export default UserProfileViewSlice.reducer;