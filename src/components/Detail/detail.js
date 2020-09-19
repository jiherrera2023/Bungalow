import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

import { Overlay } from 'react-native-elements';
import Constants from 'expo-constants';

import { useSelector, useDispatch } from 'react-redux';
import { toggleGallery } from './detailSlice';

import Swiper from './swiper';
import ImageGallery from './gallery';
import DetailInfo from './detailInfo';

const Detail = (props) => {
  const galleryVisible = useSelector((state) => state.detail.galleryVisible);
  const sublet = props.route.params;

  if (!sublet || !sublet.price) return <Text> Error getting data </Text>;

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C1DCE7',
      padding: 15,
      marginTop: Constants.statusBarHeight,
    },
    overlay: {
      borderRadius: 25,
      width: '90%',
      height: '90%',
      backgroundColor: 'whitesmoke',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={() => dispatch(toggleGallery())}>
          <Swiper sublet={sublet} />
        </TouchableWithoutFeedback>
        <DetailInfo sublet={sublet} />
        <Overlay overlayStyle={styles.overlay} isVisible={galleryVisible} onBackdropPress={() => dispatch(toggleGallery())}>
          <ImageGallery sublet={sublet} />
        </Overlay>
      </ScrollView>
    </View>
  );
};

export default Detail;
