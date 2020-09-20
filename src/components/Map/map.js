import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
  StyleSheet, View, Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import getSublets from '../../api/api';

const testSublet = [
  {
    _id: { $oid: '5f65a79d4a876d0038594aaf' },
    images: ['https://i.imgur.com/xBiHUyE.jpg'],
    title: 'Ttt',
    address: 'V V Spa, Bellaire Boulevard, Houston, TX, USA',
    description: 'Ccf',
    bathrooms: { $numberInt: '4' },
    price: { $numberInt: '888' },
    footage: { $numberInt: '88' },
    phone: '899',
    email: 'vyliu19@mail.strakejesuit.org',
    name: 'Vincent Liu',
    latitude: 29.7046637,
    longitude: -95.49107289999999,
    uid: '5f65a79d4a876d0038594aaf',
    createdAt: { $date: { $numberLong: '1600497565302' } },
    updatedAt: { $date: { $numberLong: '1600497565302' } },
    __v: { $numberInt: '0' },
  },
  {
    _id: { $oid: '5f65bb924a876d0038594ab0' },
    images: ['https://i.imgur.com/ewjxELw.jpg'],
    title: 'Test',
    address: 'JDH Property Management Co, East Freeway Service Road, Channelview, TX, USA',
    description: 'Yest',
    bathrooms: { $numberInt: '3' },
    price: { $numberInt: '56565' },
    footage: { $numberInt: '899595' },
    phone: '959595',
    email: 'vyliu19@mail.strakejesuit.org',
    name: 'Vincent Liu',
    latitude: 29.7746821,
    longitude: -95.14251399999999,
    uid: '5f65bb924a876d0038594ab0',
    createdAt: { $date: { $numberLong: '1600502674726' } },
    updatedAt: { $date: { $numberLong: '1600502674726' } },
    __v: { $numberInt: '0' },
  },
];

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
  const location = useSelector((state) => state.global.location);
  const sublets = useSelector((state) => state.global.allSublets);
  const [region, setRegion] = React.useState({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log(location);
  console.log(sublets);
  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        loadingEnabled
        initialRegion={region}
        region={region}
      >
        {sublets.map((marker) => (
          <Marker
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            onCalloutPress={() => {
              props.navigation.navigate('Home', { screen: 'HomeDetail', params: marker });
            }}
            region={region}
            onRegionChange={(newRegion) => {
              setRegion(newRegion);
            }}
            onPress={() => {
              setRegion({
                latitude: marker.latitude,
                longitude: marker.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });
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
