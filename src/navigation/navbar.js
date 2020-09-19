import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; // react-native-vector-icons/FontAwesome';
import HomeNavigator from './homeNavigator';
import LikedNavigator from './likedNavigator';
import SettingsNavigator from './settingsNavigator';
import AddedNavigator from './addedNavigator';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: true,
          safeAreaInsets: {
            bottom: 0,
          },
        }}
        screenOptions={
          ({ route }) => ({
            tabBarIcon: ({ focused }) => {
              // This whole function tells the Tab.Navigator which icons belong to which tab
              let iconName;

              // Customize the icon we display based on the tab route
              if (route.name === 'Home') {
                // All the various availible icon names here: https://icons.expo.fyi/
                iconName = 'home';
              } else if (route.name === 'Settings') {
                iconName = 'setting';
              } else if (route.name === 'Liked') {
                iconName = 'heart';
              } else if (route.name === 'Added') {
                iconName = 'plus';
              }

              // Return the respective icon
              return <AntDesign name={iconName} size={26} color={focused ? '#58AADA' : 'grey'} />;
            },
          })
        }
      >
        {
        // These correspond to the different comonents rendered in each screen
        }
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Liked" component={LikedNavigator} />
        <Tab.Screen name="Added" component={AddedNavigator} />
        <Tab.Screen name="Settings" component={SettingsNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabBar;
