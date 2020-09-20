/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { callForHomeSublets } from '../../api/api';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    sublets: [],
    heart: { isEmpty: true, sublet: undefined },
    currentSublet: null,
  },
  reducers: {
    pushNextSublets: (state, action) => {
      state.sublets = [...(state.sublets.slice(Math.max(state.sublets.length - 2, 0))), ...action.payload];
    },
    setHeart: (state, action) => {
      state.heart = action.payload;
    },
    setCurrentSublet: (state, action) => {
      state.currentSublet = action.payload;
    },
  },
});

export const { pushNextSublets, setHeart, setCurrentSublet } = homeSlice.actions;

export const callForNextBatch = () => {
  // the inside "thunk function"

  return async (dispatch, getState) => {
    try {
      // mimics an API call
      const { email } = getState().global.loginResult.user;
      const { jwt } = getState().global;
      const next = await callForHomeSublets(email, jwt, 10);
      await dispatch(pushNextSublets(next));
    } catch (err) {
      // If something went wrong, handle it here
      console.log('Error:', err);
    }
  };
};

export default homeSlice.reducer;
