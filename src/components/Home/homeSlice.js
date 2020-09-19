/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const dummyTempSublet = (txt) => ({
  id: '24y52uy45t2i435y2',
  address: '12345 First St. New York, NY 11111',
  price: '1000',
  description: "  Come check out this shitty excuse for an aparment we have. You are certainly going to get ripped off, but at least you can have fun while doing it. We don't give a shit about you are your dog.", // eslint-disable-line
  email: 'filler@gmail.com',
  owner: txt,
  phone: '123-456-7890',
  images: [
    'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/sourced/s3/2019-11/IMG_5577.JPG?itok=Vl0aR9EE',
    'https://www.coldwellbanker.com/images_brand/CB/72508062.jpg',
    'https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg',
    'https://charlotteagenda-charlotteagenda.netdna-ssl.com/wp-content/uploads/2019/10/open-houses-october.jpg',
  ],
  bedrooms: 4,
  bathrooms: 2,
  footage: 1000,
  title: 'Apartment',
});

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    sublets: [dummyTempSublet('a'), dummyTempSublet('b'), dummyTempSublet('c'), dummyTempSublet('d'), dummyTempSublet('e'), dummyTempSublet('f')],
    heart: { isEmpty: true, sublet: undefined },
    currentSublet: dummyTempSublet('a'),
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
    let next;
    try {
      // mimics an API call
      next = await Promise.resolve([dummyTempSublet('g'), dummyTempSublet('h'), dummyTempSublet('i'), dummyTempSublet('j'), dummyTempSublet('k')]);
      await dispatch(pushNextSublets(next));
    } catch (err) {
      // If something went wrong, handle it here
      console.log('Error:', err);
    }
    return Promise.resolve(next);
  };
};

export default homeSlice.reducer;
