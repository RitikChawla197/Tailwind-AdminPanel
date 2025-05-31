import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
import { AllGroupViewApi } from "@/api/Api";

const GroupViewSlice = createSlice({
    name:"GroupViewSlice",
    initialState:{
        GroupisLoading: false,
        GroupAlldata: null,
        GroupisError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AllGroupViewApi.pending, (state,action) => {
            state.GroupisLoading = true;
        });
        builder.addCase(AllGroupViewApi.fulfilled, (state, action) => {
            state.GroupisLoading = false;
            state.GroupAlldata = action.payload;
        });
        builder.addCase(AllGroupViewApi.rejected, (state, action) => {
            state.GroupisLoading = false;
            state.GroupisError=true;
        });
    },
});

export default GroupViewSlice.reducer;