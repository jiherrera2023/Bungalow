/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const addedSlice = createSlice({
  name: 'added',
  initialState: {
    added: [],
    bedroom: 0,
    address: '',
    description: '',
    bathroom: 0,
    images: [],
    phone: '',
    title: '',
    footage: '',
    price: '',
  },
  reducers: {
    setAdded: (state, action) => {
      state.added = action.payload;
    },
    addToAdded: (state, action) => {
      state.added.push(action.payload);
    },
    removeFromAdded: (state, action) => {
      state.added = state.added.filter((sublet) => {
        return sublet.id !== action.payload.id;
      });
    },
    setBedroom: (state, action) => {
      state.bedroom = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setBathroom: (state, action) => {
      state.bathroom = action.payload;
    },
    addImage: (state, action) => {
      state.images.push(action.payload);
      console.log(state.Images);
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setFootage: (state, action) => {
      state.footage = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});
export const {
  setAdded, addToAdded, removeFromAdded, setBedroom, setAddress, setDescription, setBathroom, setImages, setPhone, setTitle, setFootage, setPrice, addImage,
} = addedSlice.actions;

export default addedSlice.reducer;
