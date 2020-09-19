/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'detail',
  initialState: {
    galleryVisible: false,
  },
  reducers: {
    toggleGallery: (state, action) => {
      state.galleryVisible = !state.galleryVisible;
    },
  },
});

export const { toggleGallery } = counterSlice.actions;

export default counterSlice.reducer;
