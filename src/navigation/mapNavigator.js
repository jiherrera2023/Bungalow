import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from '../components/Detail/detail';
import Map from '../components/Map/map';
import ScreenOptions from './screenOptions';

const Stack = createStackNavigator();

const MapNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MapStack" screenOptions={ScreenOptions}>
      <Stack.Screen name="MapStack" component={Map} />
      <Stack.Screen name="MapDetail" component={Detail} />
    </Stack.Navigator>
  );
};

export default MapNavigator;
