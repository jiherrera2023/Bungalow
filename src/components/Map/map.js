import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet, View, Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const Map = () => {
  const location = useSelector((state) => state.global.location);
  console.log(location.coords.latitude);
  console.log(location);
  const [regionSet, setRegionSet] = React.useState(false);
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        loadingEnabled
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>

  );
};

export default Map;
