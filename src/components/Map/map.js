import React from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const Map = () => {
  return (
    <MapView
      style={styles.container}
      showsUserLocation
      showsMyLocationButton
    />
  );
};

export default Map;
