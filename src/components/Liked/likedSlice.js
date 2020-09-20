/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const likedSlice = createSlice({
  name: 'liked',
  initialState: {
    liked: [],
  },
  reducers: {
    setliked: (state, action) => {
      state.liked = action.payload;
    },
    addToLiked: (state, action) => {
      state.liked.push(action.payload);
    },
    removeFromLiked: (state, action) => {
      state.liked = state.liked.filter((sublet) => {
        return sublet.id !== action.payload.id;
      });
    },
  },
});

export const { setliked, addToLiked, removeFromLiked } = likedSlice.actions;

export default likedSlice.reducer;
