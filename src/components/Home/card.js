import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import {
  Card,
} from 'react-native-elements';

import Icons from './icons';

const Home = (props) => {
  const styles = StyleSheet.create({
    cardContainer: {
      padding: 15,
      backgroundColor: 'whitesmoke',
    },
    image: {
      borderRadius: 25,
    },
  });

  return (
    <>
      <Card containerStyle={styles.cardContainer}>
        <Card.Image
          source={{ uri: props.mainImg.uri }}
          style={styles.image}
        />
        <Card.Divider />
        <Text> {props.owner} </Text>
        <Icons />
      </Card>
    </>
  );
};

export default Home;
