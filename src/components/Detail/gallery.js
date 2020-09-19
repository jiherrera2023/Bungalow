import React from 'react';
import { StyleSheet, YellowBox } from 'react-native';

import GallerySwiper from 'react-native-gallery-swiper';

const ImageGallery = (props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'whitesmoke',
      width: '100%',
      height: '100%',
    },
    gallery: {
      borderRadius: 25,
      backgroundColor: 'whitesmoke',
      width: '100%',
      height: '100%',
    },
    image: {
      alignSelf: 'center',
      borderRadius: 25,
    },
  });

  YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);

  const imgs = [props.sublet.mainImg, ...props.sublet.otherImgs];

  return (
    <GallerySwiper
      enableResistance={false}
      initialPage={0}
      style={styles.gallery}
      images={imgs}
    />
  );
};

export default ImageGallery;
