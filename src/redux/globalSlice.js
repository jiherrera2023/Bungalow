/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';

import { initialState, callJWT, loginGoogle } from '../api/api';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    androidClientId: '353507777246-q9hud32c3brbudlk47que2p3rcg5dr6f.apps.googleusercontent.com',
    loginResult: { isLoading: true },
    subletData: [],
    isLoggingIn: false,
    jwt: '',
    location: {
      coords: {
        longitude: 0,
        latitude: 0,
      },
    },
  },
  reducers: {
    setLoginResult: (state, action) => {
      state.loginResult = action.payload;
    },
    setIsLoading: (state, action) => {
      state.loginResult.isLoading = action.payload;
    },
    appendSublet: (state, action) => {
      state.subletData.push(action.payload);
    },
    toggleIsLoggingIn: (state, action) => {
      state.isLoggingIn = !state.isLoggingIn;
    },
    setJWT: (state, action) => {
      state.jwt = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});
export const {
  setLoginResult, appendSublet, toggleIsLoggingIn, setJWT, setIsLoading, setLocation,
} = globalSlice.actions;

export const loadStateFromBackend = () => {
  return async (dispatch, getState) => {
    // Get state w/ jwt accessToken
    // TODO: save state to homeslice, likedSlice, and addedSlice
    const userEmail = getState().global.loginResult.user.email;
    const jwtToken = getState().global.jwt;
    const initState = initialState(userEmail, jwtToken);
    console.log(initState);
  };
};

export const getJWT = (token, email) => {
  return async (dispatch, getState) => {
    const res = await callJWT(token, email);
    dispatch(setJWT(res.data.jwt));
    dispatch(setIsLoading(false));
  };
};

export const getLocationOnStartup = (token) => {
  return async (dispatch, getState) => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied. You won\'t be able to see sublets near you!'); // eslint-disable-line
    }

    const position = await Location.getCurrentPositionAsync({});
    await dispatch(setLocation(position));
  };
};

export const signIn = () => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      // Toggle Login Button Load Animation On
      await dispatch(toggleIsLoggingIn());
      const clientId = getState().global.androidClientId;
      const result = await loginGoogle(clientId);
      if (result.type === 'success') {
        await AsyncStorage.setItem('LOGIN_RESULT_VALUE', JSON.stringify(result));
        await dispatch(getJWT(result.accessToken, result.user.email));
        await dispatch(setLoginResult(result));
        await dispatch(loadStateFromBackend());
      }
      // Toggle Login Button Load Animation Off
      dispatch(toggleIsLoggingIn());
    } catch (err) {
      // If something went wrong, handle it here
      console.log('Login Error:', err);
    }
  };
};

export default globalSlice.reducer;
