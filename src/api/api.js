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
  return axios.post(API_ROOT + API_POST_SUBLET, {
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
  }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });
};

const postSeenSublet = async (subletId, jwt) => {
  return axios.post(API_ROOT + API_POST_SEEN, { id: subletId, timestamp: Date.now() }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });
};

const postLikedSublet = async (subletId, jwt) => {
  return axios.post(API_ROOT + API_POST_LIKED, { id: subletId, timestamp: Date.now() }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });
};

const removeLikedSublet = async (subletId, jwt) => {
  return axios.post(API_ROOT + API_REMOVE_LIKED, { id: subletId, timestamp: Date.now() }, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });
};

const removePostedSublet = async (subletId, jwt) => {
  return axios.post(API_ROOT + API_REMOVE_POST, subletId, {
    headers: {
      authorization: jwt,
    },
  }).catch((err) => {
    console.log('Error in Backend Post Sublet', err);
  });
};

const callForHomeSublets = async (email, jwt, quantity) => {
  return axios.post(API_ROOT + API_CALL_NEXT_BATCH, { email, quantity: quantity || 10 }, {
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
  uploadImagesToImgur,
  postSublet,
  postSeenSublet,
  postLikedSublet,
  removeLikedSublet,
  removePostedSublet,
  callForHomeSublets,
};
