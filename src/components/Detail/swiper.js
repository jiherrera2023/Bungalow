import React from 'react';

import {
  useWindowDimensions, ActivityIndicator, StyleSheet, View, TouchableWithoutFeedback,
} from 'react-native';

import { Image } from 'react-native-elements';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { useDispatch } from 'react-redux';
import { toggleGallery } from './detailSlice';

const Swiper = (props) => {
  const sideLength = useWindowDimensions().width - 30;
  const styles = StyleSheet.create({
    swiperContainer: {
      flexDirection: 'column',
      backgroundColor: '#C1DCE7',
      width: sideLength, // Because parent component has padding of 20
      height: sideLength,
    },
    image: {
      alignSelf: 'center',
      borderRadius: 25,
      width: sideLength,
      height: sideLength,
    },
  });

  const dispatch = useDispatch();
  const imgs = props.sublet.images.map((url) => {
    return { uri: url };
  });

  const swiperRef = React.useRef(null);

  return (
    <View style={styles.swiperContainer}>
      <SwiperFlatList
        ref={swiperRef}
        style={styles.flatlist}
        showPagination
        paginationActiveColor="white"
        data={imgs}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => dispatch(toggleGallery())}>
            <Image
              containerStyle={styles.image}
              source={item}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

export default Swiper;
