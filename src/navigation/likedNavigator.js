import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from '../components/Detail/detail';
import Liked from '../components/Liked/liked';

const Stack = createStackNavigator();

const LikedNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LikedList" screenOptions={{ headerShown: false, gestureEnabled: 'false' }}>
      <Stack.Screen name="LikedDetail" component={Detail} />
      <Stack.Screen name="LikedList" component={Liked} />
    </Stack.Navigator>
  );
};

export default LikedNavigator;
