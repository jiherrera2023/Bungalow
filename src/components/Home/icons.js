import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToLiked, removeFromLiked } from '../Liked/likedSlice';
import { setHeart } from './homeSlice';
import { postLikedSublet, removeLikedSublet } from '../../api/api';

const Home = (props) => {
  const jwt = useSelector((state) => state.global.jwt);
  const styles = StyleSheet.create({
    iconWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      marginHorizontal: 10,
      padding: 15,
      borderRadius: 15,
      backgroundColor: 'whitesmoke',
    },
  });
  const dispatch = useDispatch();
  const heart = useSelector((state) => state.home.heart);

  const toggleLiked = () => {
    if (heart) {
      // This sublet should be in liked
      postLikedSublet(props.sublet.id, jwt);
      dispatch(addToLiked(props.sublet));
    } else {
      removeLikedSublet(props.sublet.id, jwt);
      dispatch(removeFromLiked(props.sublet));
    }
    dispatch(setHeart(!heart));
  };

  return (
    <View style={styles.iconWrapper}>
      <AntDesign name={heart ? 'hearto' : 'heart'} size={32} color="pink" onPress={toggleLiked} style={styles.icon} />
      <AntDesign name="message1" size={32} color="black" style={styles.icon} />
      <Entypo name="location-pin" size={32} color="blue" style={styles.icon} />
      <SimpleLineIcons name="options" size={32} color="black" style={styles.icon} />
    </View>
  );
};

export default Home;
