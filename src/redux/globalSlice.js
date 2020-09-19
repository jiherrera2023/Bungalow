/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import * as Google from 'expo-google-app-auth';
import * as Location from 'expo-location';
import axios from 'axios';
import {
  API_ROOT, API_SIGNUP, API_SIGNIN,
} from '../configs';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    androidClientId: '353507777246-q9hud32c3brbudlk47que2p3rcg5dr6f.apps.googleusercontent.com',
    loginResult: { isLoading: true },
    subletData: [],
    isLoggingIn: false,
    jwt: '',
    location: null,
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

const callJWT = async (token, email, dispatch) => {
  // TODO: Merge these into one API call. Add Referesh token functionality
  // await axios.post(API_ROOT + API_SIGNIN, { accessToken: token }).then((res) => {
  //   dispatch(setJWT(res.data.jwt));
  // }).catch((err) => {
  //   axios.post(API_ROOT + API_SIGNUP, { accessToken: token, email }).then((res2) => {
  //     dispatch(setJWT(res2.data.jwt));
  //   }).catch((err2) => {
  //     console.log(err2);
  //   });
  // });
};

export const getJWT = (token, email) => {
  return async (dispatch, getState) => {
    callJWT(token, email, dispatch);
    dispatch(setIsLoading(false));
  };
};

export const loadStateFromBackend = (token) => {
  return async (dispatch, getState) => {
    // Get state w/ jwt accessToken
    // save state to homeslice, likedSlice, and addedSlice
  };
};

export const getLocationOnStartup = (token) => {
  return async (dispatch, getState) => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied'); // eslint-disable-line
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
      const result = await Google.logInAsync({
        androidClientId: getState().global.androidClientId,
        // iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        await AsyncStorage.setItem('LOGIN_RESULT_VALUE', JSON.stringify(result));
        await dispatch(getJWT(result.accessToken, result.user.email));
        const token = getState().global.jwt;
        await dispatch(loadStateFromBackend(token));
        dispatch(setLoginResult(result));
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
