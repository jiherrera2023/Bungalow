// TODO
// Load State From Backend
// Post sublet
// Post Liked
// Get Home Refresh
// Imgur API
// Get JWT Token

import axios from 'axios';
import * as Google from 'expo-google-app-auth';

import {
  API_ROOT,
  API_ACCESS,
  API_POST_SUBLET,
  API_LOAD_INITIAL_STATE,
} from './configs';

const initialState = async (userEmail, jwtToken) => {
  return axios.post(API_ROOT + API_LOAD_INITIAL_STATE, { email: userEmail, amount: 15 }, { headers: { authorization: jwtToken } }).catch((err) => {
    console.log('Init State Load Failed', err);
  });
};

const callJWT = async (token, email) => {
  // TODO: Merge these into one API call. Add Referesh token functionality
  return axios.post(API_ROOT + API_ACCESS, { accessToken: token, email: email }).catch((err) => {
    console.log('Failed to retieive jwt token: ', err);
  });
};

const loginGoogle = async (clientId) => {
  return Google.logInAsync({
    androidClientId: clientId,
    // iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
    scopes: ['profile', 'email'],
  }).catch((err) => {
    console.log('Login Error From Google: ', err);
  });
};

const postSublet = async (sublet, jwt) => {
  return axios.post(API_ROOT + API_POST_SUBLET, {
    title: sublet.title,
    address: sublet.address,
    description: sublet.description,
    bathrooms: sublet.bathroom,
    price: sublet.price,
    footage: sublet.footage,
    bedroom: sublet.bedroom,
  }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });
};

export {
  initialState,
  callJWT,
  loginGoogle,
};
