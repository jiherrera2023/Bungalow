import React from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import {
  Slider, Input, Text, Button, Badge,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMinPrice, setBedroom, setMaxPrice, setLatitude, setBathroom, setLongitude, setRange, setFootage,
} from './preferencesSlice';
import { updateUserFilters } from '../../api/api';

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
  mapStyle: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
});

const preferences = ({ navigation }) => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.global.loginResult.user.email);
  const jwt = useSelector((state) => state.global.jwt);
  const minPrice = useSelector((state) => state.preferences.minPrice);
  const maxPrice = useSelector((state) => state.preferences.maxPrice);
  const footage = useSelector((state) => state.preferences.footage);
  const bedroom = useSelector((state) => state.preferences.bedroom);
  const bathroom = useSelector((state) => state.preferences.bathroom);
  const latitude = useSelector((state) => state.preferences.latitude);
  const longitude = useSelector((state) => state.preferences.longitude);
  const range = useSelector((state) => state.preferences.range);
  const sublets = useSelector((state) => state.global.allSublets);
  const [submitErrors, setErrors] = React.useState([]);
  const biggerBedroom = (bedroom > 8);
  const biggerBathroom = (bathroom > 8);
  const errorLength = (submitErrors.length > 0);
  async function updatePreferences() {
    const errors = [];
    if (maxPrice === 0) {
      errors.push('maxPrice');
    }
    if (maxPrice < minPrice) {
      errors.push('max price must be higher than min price');
    }
    if (footage === 0) {
      errors.push('footage');
    }
    console.log('Pressed Submit');
    setErrors(errors);
    if (errors.length !== 0) {
      return false;
    }
    console.log('about to post');
    const toSendPreferences = {
      email: email,
      preferences: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        footage: footage,
        bedroom: bedroom,
        bathroom: bathroom,
        latitude: latitude,
        longitude: longitude,
        range: range,
      },
    };
    console.log(toSendPreferences);
    updateUserFilters(toSendPreferences, jwt).then(() => {
      navigation.navigate('Settings', { screen: 'SettingsList' });
    });
    return true;
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
          What are your sublet preferences?
        </Text>
        <Input
          placeholder="Minimum Price"
          value={minPrice === 0 ? '' : minPrice.toString()}
          leftIcon={{ type: 'font-awesome', name: 'dollar' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            dispatch(setMinPrice(parseInt(value.toString().replace(/[^0-9]/g, ''), 10)));
            console.log(minPrice);
          }}
        />
        <Input
          placeholder="Maximum Price"
          value={maxPrice === 0 ? '' : maxPrice.toString()}
          leftIcon={{ type: 'font-awesome', name: 'dollar' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            dispatch(setMaxPrice(parseInt(value.toString().replace(/[^0-9]/g, ''), 10)));
          }}
        />
        <Input
          placeholder="Enter Square Footage"
          value={footage === 0 ? '' : footage.toString()}
          keyboardType="numeric"
          rightIcon={{ type: 'font-awesome', name: 'home' }}
          onChangeText={(value) => {
            dispatch(setFootage(parseInt(value.toString().replace(/[^0-9]/g, ''), 10)));
          }}
        />
        <Slider
          value={bedroom}
          onValueChange={(value) => {
            dispatch(setBedroom(value));
            Keyboard.dismiss();
          }}
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
          onValueChange={(value) => {
            dispatch(setBathroom(value));
            Keyboard.dismiss();
          }}
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
        <Text>
          Drag the Marker on the map below to set your location, or enter your own!
        </Text>
        <Input
          placeholder="Latitude"
          value={latitude === 0 ? '' : latitude.toString()}
          leftIcon={{ type: 'font-awesome', name: 'map' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            dispatch(setLatitude(parseInt(value.toString().replace(/[^0-9]/g, ''), 10)));
          }}
        />
        <Input
          placeholder="Longitude"
          value={longitude === 0 ? '' : longitude.toString()}
          leftIcon={{ type: 'font-awesome', name: 'map' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            dispatch(setLongitude(parseInt(value.toString().replace(/[^0-9]/g, ''), 10)));
          }}
        />
        <Input
          placeholder="Range (Miles), 0 means unlimited"
          value={range === 0 ? '' : range.toString()}
          leftIcon={{ type: 'font-awesome', name: 'location-arrow' }}
          keyboardType="numeric"
          onChangeText={(value) => {
            dispatch(setRange(parseInt(value.toString().replace(/[^0-9]/g, ''), 10)));
          }}
        />
        <Button title="Update Preferences"
          onPress={() => {
            updatePreferences();
          }}
        />
        {errorLength
          ? (
            <Badge value="The Following issues have occurred:"
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
                key={error}
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
        <MapView style={styles.mapStyle}
          loadingEnabled
          initialRegion={
            {
              latitude: latitude || 0,
              longitude: longitude || 0,
              latitudeDelta: range / 8,
              longitudeDelta: range / 8,
            }
            }
          region={{
            latitude: latitude || 0,
            longitude: longitude || 0,
            latitudeDelta: range / 8,
            longitudeDelta: range / 8,
          }}
        >
          {sublets.map((marker) => (
            <Marker
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.description}
              key={marker.uid}
            />
          ))}
          <Marker draggable
            coordinate={{ latitude: latitude || 0, longitude: longitude || 0 }}
            title="Center of Sublets"
            pinColor="green"
            onDragEnd={(e) => {
              console.log(e);
              dispatch(setLongitude(e.nativeEvent.coordinate.longitude));
              dispatch(setLatitude(e.nativeEvent.coordinate.latitude));
            }}
          />
          <Circle
            center={
              {
                latitude: latitude || 0,
                longitude: longitude || 0,
              }
            }
            radius={(range || 0) * 1609}
            strokeColor="rgba(0, 150, 0, 0.5)"
            fillColor="rgba(0, 255, 0, 0.2)"
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

export default preferences;
