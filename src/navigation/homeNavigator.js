import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from '../components/Detail/detail';
import Home from '../components/Home/home';
import ScreenOptions from './screenOptions';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeDeck" screenOptions={ScreenOptions}>
      <Stack.Screen name="HomeDetail" component={Detail} />
      <Stack.Screen name="HomeDeck" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
