import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
import { UpdateConnectionUserViewApi } from "@/api/Api";

const UpdateConnectionUserSlice = createSlice({
    name:"UpdateConnectionUserSlice",
    initialState:{
        UpdateConnectionisLoading: false,
        UpdateConnectiondata: null,
        UpdateConnectionisError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(UpdateConnectionUserViewApi.pending, (state,action) => {
            state.UpdateConnectionisLoading = true;
        });
        builder.addCase(UpdateConnectionUserViewApi.fulfilled, (state, action) => {
            state.UpdateConnectionisLoading = false;
            state.UpdateConnectiondata = action.payload;
        });
        builder.addCase(UpdateConnectionUserViewApi.rejected, (state, action) => {
            state.UpdateConnectionisLoading = false;
            state.UpdateConnectionisError=true;
        });
    },
});

export default UpdateConnectionUserSlice.reducer;