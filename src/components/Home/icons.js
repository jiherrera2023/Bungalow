import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToLiked, removeFromLiked } from '../Liked/likedSlice';

const Home = (props) => {
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

  const toggleLiked = () => {
    if (props.heart) {
      // This sublet should be in liked
      dispatch(addToLiked(props.sublet));
    } else {
      dispatch(removeFromLiked(props.sublet));
    }
    props.setHeart(!props.heart);
  };

  return (
    <View style={styles.iconWrapper}>
      <AntDesign name={props.heart ? 'hearto' : 'heart'} size={32} color="pink" onPress={toggleLiked} style={styles.icon} />
      <AntDesign name="message1" size={32} color="black" style={styles.icon} />
      <Entypo name="location-pin" size={32} color="blue" style={styles.icon} />
      <SimpleLineIcons name="options" size={32} color="black" style={styles.icon} />
    </View>
  );
};

export default Home;
