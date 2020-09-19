import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import {
  Slider,
} from 'react-native-elements';

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
const addSublet = () => {
  const [bedroom, setBedroom] = React.useState(0);
  const [address, setAddress] = React.useState(0);
  const [description, setDescription] = React.useState(0);
  const [bathroom, setBathroom] = React.useState(0);
  const [phone, setPhone] = React.useState(0);
  const [images, setImages] = React.useState(0);
  const [title, setTitle] = React.useState(0);
  const [footage, setFootage] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const biggerBedroom = (bedroom > 8);
  const biggerBathroom = (bathroom > 8);
  return (
    <View style={styles.container}>
      <Text>
        Tells us about your sublet!
      </Text>
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
