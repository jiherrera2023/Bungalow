import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Keyboard,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';

import {
  Slider, Input, Text, Button, Icon, Badge,
} from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { uploadImagesToImgur, postSublet } from '../../api/api';
import {
  setBedroom, setAddress, setDescription, setBathroom, setImages, setPhone, setTitle, setFootage, setPrice,
} from './addedSlice';
import { addToLiked } from '../Liked/likedSlice';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  bedroom: {
    marginTop: 20,
    zIndex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  bathroom: {
    marginTop: 20,
    zIndex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  locationSuggestion: {
    backgroundColor: 'white',
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    zIndex: 1,
  },
  locationCard: {
    borderWidth: 0,
  },
  phoneContainer: {

  },
});

const addSublet = ({ navigation }) => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.added.title);
  const address = useSelector((state) => state.added.address);
  const description = useSelector((state) => state.added.description);
  const price = useSelector((state) => state.added.price);
  const footage = useSelector((state) => state.added.footage);
  const phone = useSelector((state) => state.added.phone);
  const bedroom = useSelector((state) => state.added.bedroom);
  const bathroom = useSelector((state) => state.added.bathroom);
  const images = useSelector((state) => state.added.images);

  const [locationHeight, setLocationHeight] = React.useState(0);
  const [locationPredictions, setLocationPredictions] = React.useState(null);
  const [submitErrors, setErrors] = React.useState([]);
  const [scrollView, setScrollView] = React.useState(null);

  const biggerBedroom = (bedroom > 8);
  const biggerBathroom = (bathroom > 8);
  const imageLength = (images.length > 0);
  const errorLength = (submitErrors.length > 0);
  const location = useSelector((state) => state.global.location);
  return (
    <ScrollView
      ref={(ref) => setScrollView(ref)}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text h3
          style={
        {
          alignItems: 'center',
          marginBottom: 20,
        }
      }
        >
          Tells us about your sublet!
        </Text>
        <Input
          placeholder="Enter Title"
          value={title}
          onChangeText={(value) => {
            dispatch(setTitle(value));
          }}
        />
      </View>
    </ScrollView>
  );
};

export default addSublet;
