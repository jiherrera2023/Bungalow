import React from 'react';
import {
  useWindowDimensions,
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default (props) => {
  const styles = StyleSheet.create({
    infoContainer: {
      flexDirection: 'column',
      backgroundColor: 'whitesmoke',
      padding: 15,
      marginTop: 15,
      borderRadius: 25,
      width: useWindowDimensions().width - 30, // Because parent component has padding of 20
      height: 'auto',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#222',
      textAlign: 'center',
      fontFamily: 'sans-serif-medium',
    },
    description: {
      color: '#333',
      fontSize: 16,
    },
    contact: {
      color: '#333',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
    },
    address: {
      flex: 4,
      color: '#333',
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginLeft: 10,
    },
    price: {
      flex: 3,
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginRight: 10,
    },
  });

  const subletData = props.sublet;

  return (
    <>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.address}>{subletData.address}</Text>
          <Text style={{ flex: 3 }} />
          <Text style={styles.price}>${subletData.price} mo.</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Description</Text>
        <Text style={styles.description}>{subletData.description}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.header}>Owner</Text>
        <Text style={styles.contact}>{subletData.owner}</Text>
        <Text style={styles.header}>Phone</Text>
        <Text style={styles.contact}>{subletData.phone}</Text>
        <Text style={styles.header}>Email</Text>
        <Text style={styles.contact}>{subletData.email}</Text>
      </View>
    </>
  );
};
