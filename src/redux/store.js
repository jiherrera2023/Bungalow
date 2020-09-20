import { configureStore } from '@reduxjs/toolkit';
import detailReducer from '../components/Detail/detailSlice';
import globalReducer from './globalSlice';
import likedReducer from '../components/Liked/likedSlice';
import homeReducer from '../components/Home/homeSlice';
import addedReducer from '../components/Added/addedSlice';
import mapReducer from '../components/Map/mapSlice';

export default configureStore({
  reducer: {
    detail: detailReducer,
    global: globalReducer,
    liked: likedReducer,
    home: homeReducer,
    added: addedReducer,
    map: mapReducer,
  },
});
