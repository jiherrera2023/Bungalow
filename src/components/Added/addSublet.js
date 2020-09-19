import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Keyboard,
  ScrollView,
  Platform,
  ImageBackground,
  ImageStore,
} from 'react-native';
import {
  Slider, Input, Text, Button, Icon, Badge,
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

const uploadImagesToImgur = async (images) => {
  const auth = 'Client-ID cd419a05267203b';

  const rawImages = images.map(async (item, i) => {
    await new Promise((resolve, reject) => {
      return ImageStore.getBase64ForTag(item.image, (data) => {
        resolve(data);
      });
    });
  });

  const imageUrls = [];

  await rawImages.forEach(async (item, i) => {
    const formData = new FormData();
    formData.append('upload', {
      image: item,
      type: 'base64',
    });
    const result = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: auth,
        Accept: 'application/json',
      },
    });

    const imgUrl = `https://imgur.com/gallery/${result.data.id}`;

    imageUrls.push(imgUrl);
  });
  return imageUrls;
};

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
  const [locationPredictions, setLocationPredictions] = React.useState(null);
  const [submitErrors, setErrors] = React.useState([]);
  const [scrollView, setScrollView] = React.useState(null);
  const biggerBedroom = (bedroom > 8);
  const biggerBathroom = (bathroom > 8);
  const imageLength = (images.length > 0);
  const errorLength = (submitErrors.length > 0);
  const location = useSelector((state) => state.global.location);

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
    console.log('submit');
    setErrors(errors);
  }
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
              onChangeDestination(address, location.coords.latitude || 0, location.coords.longitude || 0);
            }
          }}
          autoCompleteType="off"
          placeholder="Enter Address"
          onChangeText={(value) => {
            setAddress(value);
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
          onValueChange={(value) => setBathroom(value)}
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
                <ImageBackground source={{ uri: image.image }} key={image.key} style={{ width: 200, height: 200, marginTop: 10 }}>
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
