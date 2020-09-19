/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export const likedSlice = createSlice({
  name: 'liked',
  initialState: {
    liked: [{
      address: '12345 First St. New York, NY 11111',
      price: '1000',
      description: "  Come check out this shitty excuse for an aparment we have. You are certainly going to get ripped off, but at least you can have fun while doing it. We don't give a shit about you are your dog.", // eslint-disable-line
      email: 'filler@gmail.com',
      owner: 'Billy Goat',
      phone: '123-456-7890',
      mainImg: { uri: 'https://im-media.voltron.voanews.com/Drupal/01live-166/styles/sourced/s3/2019-11/IMG_5577.JPG?itok=Vl0aR9EE' },
      otherImgs: [
        { uri: 'https://www.coldwellbanker.com/images_brand/CB/72508062.jpg' },
        { uri: 'https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg' },
        { uri: 'https://charlotteagenda-charlotteagenda.netdna-ssl.com/wp-content/uploads/2019/10/open-houses-october.jpg' },
      ],
    }],
  },
  reducers: {
    setliked: (state, action) => {
      state.liked = action.payload;
    },
  },
});

export const { setliked } = likedSlice.actions;

export default likedSlice.reducer;
