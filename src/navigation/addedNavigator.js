import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from '../components/Detail/detail';
import Added from '../components/Added/added';
import AddSublet from '../components/Added/addSublet';
import ScreenOptions from './screenOptions';

const Stack = createStackNavigator();

const AddedNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AddedList" screenOptions={ScreenOptions}>
      <Stack.Screen name="AddedDetail" component={Detail} />
      <Stack.Screen name="AddedList" component={Added} />
      <Stack.Screen name="AddedPost" component={AddSublet} />
    </Stack.Navigator>
  );
};

export default AddedNavigator;
