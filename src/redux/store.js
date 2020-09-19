import { configureStore } from '@reduxjs/toolkit';
import detailReducer from '../components/detailSlice';
import globalReducer from './globalSlice';
import likedReducer from '../components/likedSlice';
import homeReducer from '../components/homeSlice';
import addedReducer from '../components/addedSlice';

export default configureStore({
  reducer: {
    detail: detailReducer,
    global: globalReducer,
    liked: likedReducer,
    home: homeReducer,
    added: addedReducer,
  },
});
