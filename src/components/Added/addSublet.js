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
  setBedroom, setAddress, setDescription, setBathroom, setImages, addImage, setPhone, setTitle, setFootage, setPrice,
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
  const userInfo = useSelector((state) => state.global.loginResult.user);
  const jwt = useSelector((state) => state.global.jwt);

  function pressedPrediction(prediction) {
    Keyboard.dismiss();
    dispatch(setAddress(prediction.description));
    setLocationPredictions(null);
    setLocationHeight(0);
  }
  const generateKey = (pre) => {
    return new Date().getTime();
  };
  function deleteImage(uri) {
    const deleted = images.filter((item) => item.key !== uri);
    dispatch(setImages(deleted));
  }
  const _pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        const generatedKey = generateKey(result.uri);
        dispatch(addImage({
          key: generatedKey,
          image: result.uri,
        }));
      }
    } catch (E) {
      console.log(E);
    }
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        console.log('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    getPermissionAsync();
  });
  async function submit() {
    const errors = [];
    if (title.localeCompare('') === 0) {
      errors.push('title');
    }
    if (address.localeCompare('') === 0) {
      errors.push('address');
    }
    if (description.localeCompare('') === 0) {
      errors.push('description');
    }
    if (footage.localeCompare('') === 0) {
      errors.push('footage');
    }
    if (phone.localeCompare('') === 0) {
      errors.push('phone');
    }
    if (images.length === 0) {
      errors.push('images');
    }
    console.log('Pressed Submit');
    setErrors(errors);
    if (errors.length !== 0) {
      return false;
    }

    const imageUrls = await uploadImagesToImgur(images);
    const postedSublet = await postSublet({
      title, address, description, bathroom, price, footage, bedroom, phone, imageUrls, email: userInfo.email, name: userInfo.name,
    }, jwt);
    console.log('posted sublet is', postedSublet.data);
    dispatch(addToLiked(postedSublet.data));

    navigation.navigate('Added', { screen: 'AddedList' });
    dispatch(setBedroom(0));
    dispatch(setAddress(''));
    dispatch(setDescription(''));
    dispatch(setBathroom(0));
    dispatch(setImages([]));
    dispatch(setPhone(''));
    dispatch(setTitle(''));
    dispatch(setFootage(''));
    dispatch(setPrice(''));
    return true;
  }
  async function onChangeDestination(destination, latitude, longitude) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDgZGG4nGHkc1KUVns-69jzSCgSvbCFJNg&input=${destination}&location=${latitude},${longitude}`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      console.log(json.predictions);
      setLocationPredictions(json.predictions.slice(0, 3).map(
        (prediction) => (
          <TouchableHighlight
            key={prediction.place_id}
            onPress={() => pressedPrediction(prediction)}
            keyboardShouldPersistTaps="handled"
            style={styles.locationCard}
          >
            <Text style={styles.locationSuggestion}
              keyboardShouldPersistTaps="handled"
            >
              {prediction.description}
            </Text>
          </TouchableHighlight>
        ),
      ));
      setLocationHeight(100);
    } catch (err) {
      console.log(err);
    }
  }
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
        <Input
          onBlur={() => {
            setLocationPredictions(null);
            setLocationHeight(0);
          }}
          onFocus={() => {
            if (address.localeCompare('') !== 0) {
              onChangeDestination(address, location.coords.latitude || 0, location.coords.longitude || 0);
            }
          }}
          autoCompleteType="off"
          placeholder="Enter Address"
          onChangeText={(value) => {
            dispatch(setAddress(value));
            onChangeDestination(value, location.coords.latitude || 0, location.coords.longitude || 0);
          }}
          value={address}
          style={
          {
            zIndex: 2,
          }
        }
        />
        <View
          keyboardShouldPersistTaps="handled"
          style={
        {
          position: 'relative',
          zIndex: 2,
          height: locationHeight,
        }
      }
        >
          {locationPredictions}
        </View>
        <Input
          multiline
          placeholder="Enter Description"
          value={description}
          onChangeText={(value) => {
            dispatch(setDescription(value));
          }}
        />
        <Input
          placeholder="Enter Price"
          value={price}
          leftIcon={{ type: 'font-awesome', name: 'dollar' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            dispatch(setPrice(value.toString().replace(/[^0-9]/g, '')));
          }}
        />
        <Input
          placeholder="Enter Square Footage"
          value={footage}
          keyboardType="numeric"
          rightIcon={{ type: 'font-awesome', name: 'home' }}
          onChangeText={(value) => {
            dispatch(setFootage(value.toString().replace(/[^0-9]/g, '')));
          }}
        />
        <Input
          dataDetectorTypes="phoneNumber"
          placeholder="Enter Phone Number"
          value={phone}
          leftIcon={{ type: 'font-awesome', name: 'phone' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            dispatch(setPhone(value.toString().replace(/[^0-9]/g, '')));
          }}
        />
        <Slider
          value={bedroom}
          onValueChange={(value) => {
            dispatch(setBedroom(value));
            Keyboard.dismiss();
          }}
          step={1}
          maximumValue={9}
          thumbTintColor="#249FF7"
          style={styles.bedroom}
        />

        <Text style={
          {
            marginLeft: 20,
            marginRight: 20,
          }
        }
        >
          {!biggerBedroom
            ? `Bedrooms: ${bedroom}`
            : 'Bedrooms: 8+'}
        </Text>
        <Slider
          value={bathroom}
          onValueChange={(value) => {
            dispatch(setBathroom(value));
            Keyboard.dismiss();
          }}
          step={1}
          maximumValue={9}
          thumbTintColor="#249FF7"
          style={styles.bathroom}
        />
        <Text style={
        {
          marginBottom: 30,
          marginLeft: 20,
          marginRight: 20,
        }
      }
        >
          {!biggerBathroom
            ? `Bathrooms: ${bathroom}`
            : 'Bathrooms: 8+'}
        </Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title={!imageLength ? 'Let\'s get some pictures of your sublet!' : 'Add some more pictures!'} onPress={_pickImage} />
          {images.map(
            (image) => {
              return (
                <ImageBackground source={{ uri: image.image }} key={image.key} resizeMode="cover" style={{ width: 200, height: 200, marginTop: 10 }}>
                  <Icon
                    position="relative"
                    name="trash"
                    containerStyle={
                        {
                          width: 26,
                          height: 26,
                          alignItems: 'center',
                          alignSelf: 'center',
                          marginTop: 87,
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        }
                      }
                    type="font-awesome"
                    onPress={() => deleteImage(image.key)}
                  />
                </ImageBackground>
              );
            },
          )}
        </View>
      </View>
      <View style={{
        flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40,
      }}
      >
        <Button title="Add Sublet!"
          onPress={() => {
            submit();
            setTimeout(() => {
              scrollView.scrollToEnd();
            }, 200);
          }}
        />
        {errorLength
          ? (
            <Badge value="The Following entries were not filled:"
              status="primary"
              badgeStyle={{
                padding: 10,
                marginTop: 10,
              }}
              textStyle={
                {
                  fontSize: 18,
                }
              }
            />
          )
          : null}
        {errorLength ? submitErrors.map(
          (error) => {
            return (
              <Badge value={error}
                key={error}
                status="primary"
                badgeStyle={{
                  padding: 10,
                  marginTop: 3,
                }}
                textStyle={
                {
                  fontSize: 18,
                }
              }
              />
            );
          },
        ) : null}
      </View>
    </ScrollView>
  );
};

export default addSublet;
