import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import {
  Slider, Input,
} from 'react-native-elements';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  bedroom: {
    marginTop: 10,
  },
  bathroom: {
    marginTop: 10,
  },
});

async function onChangeDestination(destination, latitude, longitude) {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/autcomplete/json?key=AIzaSyDgZGG4nGHkc1KUVns-69jzSCgSvbCFJNg&input=${destination}&location=${latitude},${longitude}`;
  try {
    const result = await fetch(apiUrl);
    const json = await result.json();
    console.log(json);
  } catch (err) {
    console.log(err);
  }
}
const addSublet = () => {
  const [bedroom, setBedroom] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [description, setDescription] = React.useState(0);
  const [bathroom, setBathroom] = React.useState(0);
  const [phone, setPhone] = React.useState(0);
  const [images, setImages] = React.useState(0);
  const [title, setTitle] = React.useState(0);
  const [footage, setFootage] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const biggerBedroom = (bedroom > 8);
  const biggerBathroom = (bathroom > 8);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const location = useSelector((state) => state.global.location);
  return (
    <View style={styles.container}>
      <Text>
        Tells us about your sublet!
      </Text>
      <Input
        placeholder="Enter Address"
        onChangeText={(value) => {
          setAddress(value);
          onChangeDestination(value, location.coords.latitude, location.coords.longitude);
        }}
        value={address}
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
      <Text>
        {!biggerBathroom
          ? `Bathrooms: ${bathroom}`
          : 'Bathrooms: 8+'}
      </Text>
    </View>
  );
};

export default addSublet;
