import { configureStore } from '@reduxjs/toolkit';
import detailReducer from '../components/Detail/detailSlice';
import globalReducer from './globalSlice';
import likedReducer from '../components/Liked/likedSlice';

export default configureStore({
  reducer: {
    detail: detailReducer,
    global: globalReducer,
    liked: likedReducer,
  },
});
