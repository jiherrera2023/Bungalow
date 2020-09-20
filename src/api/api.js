// TODO
// Load State From Backend
// Post sublet
// Post Liked
// Get Home Refresh
// Imgur API
// Get JWT Token

import axios from 'axios';
import * as Google from 'expo-google-app-auth';
import * as FileSystem from 'expo-file-system';
import * as AppAuth from 'expo-app-auth';

import {
  API_ROOT,
  API_ACCESS,
  API_POST_SUBLET,
  API_POST_LIKED,
  API_POST_SEEN,
  API_REMOVE_LIKED,
  API_REMOVE_POST,
  API_LOAD_INITIAL_STATE,
  API_CALL_NEXT_BATCH,
  imgurAuth,
  androidClientId,
  API_UPDATE_FILTERS,
} from './configs';

// const postPreferences = async (preferences, jwtToken) => {
//   const res = await axios.post(API_ROOT + API_UPDATE_PREFERENCES, preferences, { headers: { authorization: jwtToken } }).catch((err) => {
//     console.log('Failed to retieive jwt token: ', err);
//   });
//   console.log('post preferences result', res);
//   return res.data.jwt;
// };

const initialState = async (userEmail, jwtToken) => {
  const res = await axios.post(API_ROOT + API_LOAD_INITIAL_STATE, { email: userEmail, amount: 15 }, { headers: { authorization: jwtToken } }).catch((err) => {
    console.log('Init State Load Failed', err);
  });

  return res.data;
};

const getSublets = async (jwt) => {
  const res = await axios.get(API_ROOT + API_POST_SUBLET, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });

  return res.data;
};

export const refreshLoginToken = async (refreshToken) => {
  const config = {
    issuer: 'https://accounts.google.com',
    clientId: androidClientId,
    scopes: ['profile', 'email'],
  };

  return AppAuth.refreshAsync(config, refreshToken);
};

const callJWT = async (token, email, refreshToken) => {
  // TODO: Merge these into one API call. Add Referesh token functionality
  const res = await axios.post(API_ROOT + API_ACCESS, { accessToken: token, email: email }).catch((err) => {
    console.log('Failed to retieive jwt token. Attempting Refresh ', err);
  });

  return res && res.data ? res.data.jwt : false;
};

const loginGoogle = async () => {
  return Google.logInAsync({
    androidClientId: androidClientId,
    // iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
    scopes: ['profile', 'email'],
  }).catch((err) => {
    console.log('Login Error From Google: ', err);
  });
};

const uploadImagesToImgur = async (imagesToUpload) => {
  const imageUrls = [];
  console.log('Starting Imgur Upload', imagesToUpload);
  let rawImages = [];

  imagesToUpload.forEach((image, i) => {
    rawImages.push(FileSystem.readAsStringAsync(image.image, { encoding: 'base64' }));
  });

  rawImages = await Promise.all(rawImages);

  for (let i = 0; i < rawImages.length; i++) {
    const reqPromise = axios.post('https://api.imgur.com/3/image', rawImages[i], {
      headers: {
        Authorization: imgurAuth,
      },
    }).then((res) => {
      return res.data.data.link;
    }).catch((err) => {
      console.log('Imgur api error', err);
    });

    imageUrls.push(reqPromise);
  }

  return Promise.all(imageUrls);
};

const postSublet = async (sublet, jwt) => {
  const res = await axios.post(API_ROOT + API_POST_SUBLET, {
    title: sublet.title,
    address: sublet.address,
    description: sublet.description,
    bathrooms: sublet.bathroom,
    price: sublet.price,
    footage: sublet.footage,
    bedroom: sublet.bedroom,
    phone: sublet.phone,
    images: sublet.imageUrls,
    email: sublet.email,
    name: sublet.name,
    latitude: sublet.latitude,
    longitude: sublet.longitude,
  }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });

  return res.data;
};

const postSeenSublet = async (id, email, jwt) => {
  const res = await axios.post(API_ROOT + API_POST_SEEN, { id, email, timestamp: Date.now() }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });

  return res.data;
};

const postLikedSublet = async (id, email, jwt) => {
  const res = await axios.post(API_ROOT + API_POST_LIKED, { id, email, timestamp: Date.now() }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });

  return res.data;
};

const removeLikedSublet = async (id, email, jwt) => {
  const res = await axios.post(API_ROOT + API_REMOVE_LIKED, { id, email, timestamp: Date.now() }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });

  return res.data;
};

const removePostedSublet = async (id, email, jwt) => {
  const res = await axios.post(API_ROOT + API_REMOVE_POST, { id, email }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });

  return res.data;
};

const callForHomeSublets = async (email, jwt, quantity) => {
  const res = await axios.post(API_ROOT + API_CALL_NEXT_BATCH, { email, quantity: quantity || 10 }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });

  return res.data;
};

const updateUserFilters = async (filters, jwt) => {
  const res = await axios.post(API_ROOT + API_UPDATE_FILTERS, filters, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Update Filters', err);
  });
  console.log(res.data);
  return res.data;
};

export {
  initialState,
  callJWT,
  loginGoogle,
  uploadImagesToImgur,
  postSublet,
  postSeenSublet,
  postLikedSublet,
  removeLikedSublet,
  removePostedSublet,
  callForHomeSublets,
  getSublets,
  updateUserFilters,
};
