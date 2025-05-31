import { createSlice } from "@reduxjs/toolkit";
import { ViewDeviceApi } from "@/api/Api";

const ViewDeviceSlice = createSlice({
  name: "ViewDeviceSlice",
  initialState: {
    ViewDeviceisLoading: false,
    ViewDeviceData: null,
    ViewDeviceisError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ViewDeviceApi.pending, (state, action) => {
      state.ViewDeviceisLoading = true;
    });
    builder.addCase(ViewDeviceApi.fulfilled, (state, action) => {
      state.ViewDeviceisLoading = false;
      state.ViewDeviceData = action.payload;
    });
    builder.addCase(ViewDeviceApi.rejected, (state, action) => {
      state.ViewDeviceisLoading = false;
      state.ViewDeviceisError=true;
    });
  },
});
export default ViewDeviceSlice.reducer;