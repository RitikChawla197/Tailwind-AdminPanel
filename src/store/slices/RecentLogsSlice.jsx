import React from 'react'
import { createSlice } from '@reduxjs/toolkit';
import { LogsData } from '../../api/Api';

const RecentLogsSlice = createSlice({
    name: "RecentLogsSlice",
    initialState: {
        RecentLogisLoading: false,
        RecentLogdata: null,
        RecentLogisError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(LogsData.pending, (state, action) => {
        state.RecentLogisLoading = true;
      });
      builder.addCase(LogsData.fulfilled, (state, action) => {
        state.RecentLogisLoading = false;
        state.RecentLogdata = action.payload;
      });
      builder.addCase(LogsData.rejected, (state, action) => {
        state.RecentLogisLoading = false;
        state.RecentLogisError = true;
      });
    },
  });
  export default RecentLogsSlice.reducer;