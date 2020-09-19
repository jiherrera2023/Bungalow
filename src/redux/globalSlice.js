/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import * as Google from 'expo-google-app-auth';
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
  },
  reducers: {
    setLoginResult: (state, action) => {
      state.loginResult = action.payload;
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
  },
});
export const {
  setLoginResult, appendSublet, toggleIsLoggingIn, setJWT,
} = globalSlice.actions;

export const getJWT = (token, email) => {
  return async (dispatch, getState) => {
    axios.post(API_ROOT + API_SIGNIN, { accessToken: token }).then((res) => {
      console.log(res);
      dispatch(setJWT(res.data.jwt));
    }).catch((err) => {
      console.log(err);
      axios.post(API_ROOT + API_SIGNUP, { accessToken: token, email }).then((res2) => {
        dispatch(setJWT(res2.data.jwt));
        console.log('signed up', res2);
      }).catch((err2) => {
        console.log(err);
      });
    });
    console.log('IN GET JWT', token, email);
  };
};

export const signIn = () => {
  // the inside "thunk function"
  console.log('logging in');
  return async (dispatch, getState) => {
    try {
      await dispatch(toggleIsLoggingIn());
      const result = await Google.logInAsync({
        androidClientId: getState().global.androidClientId,
        // iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ['profile', 'email'],
      });
      console.log(result);
      if (result.type === 'success') {
        await AsyncStorage.setItem('LOGIN_RESULT_VALUE', JSON.stringify(result));
        await dispatch(getJWT(result.accessToken, result.user.email));
        dispatch(setLoginResult(result));
      }
      dispatch(toggleIsLoggingIn());
    } catch (err) {
      // If something went wrong, handle it here
      console.log('Error:', err);
    }
  };
};

export default globalSlice.reducer;
