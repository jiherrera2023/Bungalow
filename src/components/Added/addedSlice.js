/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const likedSlice = createSlice({
  name: 'added',
  initialState: {
    added: [],
  },
  reducers: {
    setAdded: (state, action) => {
      state.added = action.payload;
    },
    addToAdded: (state, action) => {
      state.added.push(action.payload);
    },
    removeFromAdded: (state, action) => {
      state.added = state.liked.filter((sublet) => {
        return sublet.id !== action.payload.id;
      });
    },
  },
});

export const { setAdded, addToAdded, removeFromAdded } = likedSlice.actions;

export default likedSlice.reducer;
