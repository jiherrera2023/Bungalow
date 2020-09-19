/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    androidClientId: 'KEY',
    loginResult: { isLoading: true },
    subletData: [],
    isLoggingIn: false,
  },
  reducers: {
    setLoginResult: (state, action) => {
      state.loginResult = action.payload.data;
    },
    setIsLoading: (state, action) => {
      state.loginResult.isLoading = action.payload.data;
    },
    appendSublet: (state, action) => {
      state.subletData.push(action.payload.data);
    },
    toggleIsLoggingIn: (state, action) => {
      state.isLoggingIn = !state.isLoggingIn;
    },
  },
});
export const {
  setLoginResult, appendSublet, toggleIsLoggingIn,
} = globalSlice.actions;

export const signIn = () => {
  try {
    // Toggle Login Button Load Animation On
    await dispatch(toggleIsLoggingIn());
    const clientId = getState().global.androidClientId;
    const result = await loginGoogle(clientId);
    if (result.type === 'success') {
      await AsyncStorage.setItem('LOGIN_RESULT_VALUE', JSON.stringify(result));
      await dispatch(getJWT(result.accessToken, result.user.email));
      await dispatch(setLoginResult(result));
    }
    // Toggle Login Button Load Animation Off
    dispatch(toggleIsLoggingIn());
  } catch (err) {
    // If something went wrong, handle it here
    console.log('Login Error:', err);
  }
};

export default globalSlice.reducer;
