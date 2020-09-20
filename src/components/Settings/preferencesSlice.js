/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    minPrice: 0,
    maxPrice: 0,
    footage: 0,
    bedroom: 0,
    bathroom: 0,
    latitude: 0,
    longitude: 0,
    range: 0,
  },
  reducers: {
    setMinPrice: (state, action) => {
      if (isNaN(action.payload)) {
        state.minPrice = 0;
        return;
      }
      state.minPrice = action.payload;
    },
    setBedroom: (state, action) => {
      state.bedroom = action.payload;
    },
    setMaxPrice: (state, action) => {
      if (isNaN(action.payload)) {
        state.maxPrice = 0;
        return;
      }
      state.maxPrice = action.payload;
    },
    setLatitude: (state, action) => {
      if (isNaN(action.payload)) {
        state.latitude = 0;
        return;
      }
      state.latitude = action.payload;
    },
    setBathroom: (state, action) => {
      state.bathroom = action.payload;
    },
    setLongitude: (state, action) => {
      if (isNaN(action.payload)) {
        state.longitude = 0;
        return;
      }
      state.longitude = action.payload;
    },
    setRange: (state, action) => {
      if (isNaN(action.payload)) {
        state.range = 0;
        return;
      }
      state.range = action.payload;
    },
    setFootage: (state, action) => {
      if (isNaN(action.payload)) {
        state.footage = 0;
        return;
      }
      state.footage = action.payload;
    },
    setPreferences: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.footage = action.payload.footage;
      state.bedroom = action.payload.bedroom;
      state.bathroom = action.payload.bathroom;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.range = action.payload.range;
    },
  },
});
export const {
  setMinPrice, setBedroom, setMaxPrice, setLatitude, setBathroom, setLongitude, setRange, setFootage, setPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
