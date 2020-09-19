import React, { useEffect } from 'react';
import {
  StyleSheet, View, TouchableHighlight, Keyboard, ScrollView, Platform, ImageBackground,
} from 'react-native';
import {
  Slider, Input, Text, Button, Icon,
} from 'react-native-elements';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  bedroom: {
    marginTop: 20,
    zIndex: 1,
  },
  bathroom: {
    marginTop: 20,
    zIndex: 1,
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

const addSublet = () => {
  const [bedroom, setBedroom] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [bathroom, setBathroom] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [phone, setPhone] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [footage, setFootage] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [locationHeight, setLocationHeight] = React.useState(0);
  const biggerBedroom = (bedroom > 8);
  const biggerBathroom = (bathroom > 8);
  const imageLength = (images.length > 0);
  const location = useSelector((state) => state.global.location);
  const [locationPredictions, setLocationPredictions] = React.useState(null);
  function pressedPrediction(prediction) {
    Keyboard.dismiss();
    setAddress(prediction.description);
    setLocationPredictions(null);
    setLocationHeight(0);
  }
  const generateKey = (pre) => {
    return new Date().getTime();
  };
  function deleteImage(uri) {
    console.log('code', uri);
    console.log('previous', images);
    const deleted = images.filter((item) => item.key !== uri);
    console.log('delete', deleted);
    setImages(deleted);
  }
  const _pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const generatedKey = generateKey(result.uri);
        setImages((oldImages) => [...oldImages, {
          key: generatedKey,
          image: result.uri,
        }]);
        const newImages = [...images, {
          key: generatedKey,
          image: result.uri,
        }];
        console.log('updatedNewImages', newImages);
        setImages(newImages);
        console.log('newImages', newImages);
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    getPermissionAsync();
  });
  async function onChangeDestination(destination, latitude, longitude) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDgZGG4nGHkc1KUVns-69jzSCgSvbCFJNg&input=${destination}&location=${latitude},${longitude}`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
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
            setTitle(value);
          }}
        />
        <Input
          onBlur={() => {
            setLocationPredictions(null);
            setLocationHeight(0);
          }}
          onFocus={() => {
            if (address.localeCompare('') !== 0) {
              onChangeDestination(address, location.coords.latitude, location.coords.longitude);
            }
          }}
          autoCompleteType="off"
          placeholder="Enter Address"
          onChangeText={(value) => {
            setAddress(value);
            onChangeDestination(value, location.coords.latitude, location.coords.longitude);
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
            setDescription(value);
          }}
        />
        <Input
          placeholder="Enter Price"
          value={price}
          leftIcon={{ type: 'font-awesome', name: 'dollar' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            setPrice(value.toString().replace(/[^0-9]/g, ''));
          }}
        />
        <Input
          placeholder="Enter Square Footage"
          value={footage}
          keyboardType="numeric"
          rightIcon={{ type: 'font-awesome', name: 'home' }}
          onChangeText={(value) => {
            setFootage(value.toString().replace(/[^0-9]/g, ''));
          }}
        />
        <Input
          dataDetectorTypes="phoneNumber"
          placeholder="Enter Phone Number"
          value={phone}
          leftIcon={{ type: 'font-awesome', name: 'phone' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            setPhone(value.toString().replace(/[^0-9]/g, ''));
          }}
        />
        <Slider
          value={bedroom}
          onValueChange={(value) => setBedroom(value)}
          step={1}
          maximumValue={9}
          thumbTintColor="#249FF7"
          style={styles.bedroom}
        />

        <Text>
          {!biggerBedroom
            ? `Bedrooms: ${bedroom}`
            : 'Bedrooms: 8+'}
        </Text>
        <Slider
          value={bathroom}
          onValueChange={(value) => setBathroom(value)}
          step={1}
          maximumValue={9}
          thumbTintColor="#249FF7"
          style={styles.bathroom}
        />
        <Text style={
        {
          marginBottom: 30,
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
                <>
                  <ImageBackground source={{ uri: image.image }} style={{ width: 200, height: 200, marginTop: 10 }}>
                    <Icon
                      position="relative"
                      name="trash"
                      style={
                        {
                          marginLeft: 50,
                        }
                      }
                      type="font-awesome"
                      onPress={() => deleteImage(image.key)}
                    />
                  </ImageBackground>
                </>
              );
            },
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default addSublet;
