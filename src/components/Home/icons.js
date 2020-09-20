import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { AntDesign, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
} from 'react-native-openanything';
import { addToLiked, removeFromLiked } from '../Liked/likedSlice';
import { setLatitude, setLongitude } from '../Map/mapSlice';
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
  const currentSublet = useSelector((state) => state.home.currentSublet);
  const email = useSelector((state) => state.global.loginResult.user.email);
  const toggleLiked = () => {
    if (heart) {
      // This sublet should be in liked
      postLikedSublet(currentSublet.id, email, jwt);
      dispatch(addToLiked(currentSublet));
    } else {
      removeLikedSublet(currentSublet.id, email, jwt);
      dispatch(removeFromLiked(currentSublet));
    }
    dispatch(setHeart(!heart));
  };
  const setMapLocation = () => {
    dispatch(setLatitude(currentSublet.latitude));
    dispatch(setLongitude(currentSublet.longitude));
  };
  return (
    <View style={styles.iconWrapper}>
      <AntDesign name={heart ? 'hearto' : 'heart'} size={32} color="pink" onPress={toggleLiked} style={styles.icon} />
      <AntDesign name="message1"
        size={32}
        onPress={() => {
          // eslint-disable-next-line
          Text(currentSublet.phone);
        }}
        color="black"
        style={styles.icon}
      />
      <Entypo name="location-pin"
        size={32}
        color="blue"
        style={styles.icon}
        onPress={() => {
          props.navigation.navigate('Map', {
            screen: 'MapStack',
          });
          setMapLocation();
        }}
      />
      <SimpleLineIcons name="options"
        size={32}
        onPress={() => {
          props.navigation.navigate('Home', {
            screen: 'HomePreferences',
          });
        }}
        color="black"
        style={styles.icon}
      />
    </View>
  );
};

export default Home;
