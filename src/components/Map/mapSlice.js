/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    latitude: 0,
    longitude: 0,
  },
  reducers: {
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
  },
});
export const {
  setLatitude, setLongitude,
} = mapSlice.actions;

export default mapSlice.reducer;
