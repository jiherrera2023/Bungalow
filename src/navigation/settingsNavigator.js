import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../components/Settings/settings';

const Stack = createStackNavigator();

const SetingsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsList" screenOptions={{ headerShown: false, gestureEnabled: 'false' }}>
      <Stack.Screen name="SettingsList" component={Settings} />
    </Stack.Navigator>
  );
};

export default SetingsNavigator;
