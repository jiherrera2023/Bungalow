/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const likedSlice = createSlice({
  name: 'liked',
  initialState: {
    liked: [{
      id: '24y52uy45t2i435y2',
      address: '12345 First St. New York, NY 11111',
      price: '1000',
      description: "  Come check out this shitty excuse for an aparment we have. You are certainly going to get ripped off, but at least you can have fun while doing it. We don't give a shit about you are your dog.", // eslint-disable-line
      email: 'filler@gmail.com',
      owner: 'Billy Goat',
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
    }],
  },
  reducers: {
    setliked: (state, action) => {
      state.liked = action.payload;
    },
    addToLiked: (state, action) => {
      state.liked.push(action.payload);
    },
    removeFromLiked: (state, action) => {
      state.liked = state.liked.filter((sublet) => {
        return sublet.id !== action.payload.id;
      });
    },
  },
});

export const { setliked, addToLiked, removeFromLiked } = likedSlice.actions;

export default likedSlice.reducer;
