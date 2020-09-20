import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet, View, Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setLongitude, setLatitude } from './mapSlice';

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

const Map = (props) => {
  const dispatch = useDispatch();
  const sublets = useSelector((state) => state.global.allSublets);
  const latitude = useSelector((state) => state.map.latitude);
  const longitude = useSelector((state) => state.map.longitude);
  console.log(latitude, longitude);
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        loadingEnabled
        initialRegion={
        {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        }
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {sublets.map((marker) => (
          <Marker
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            onCalloutPress={() => {
              props.navigation.navigate('Map', { screen: 'MapDetail', params: marker });
            }}

            onPress={() => {
              dispatch(setLatitude(marker.latitude));
              dispatch(setLongitude(marker.longitude));
            }}
            description={marker.description}
            key={marker.uid}
          />
        ))}
      </MapView>

    </View>

  );
};

export default Map;
