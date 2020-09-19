import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import Settings from '../components/Settings/settings';
import ScreenOptions from './screenOptions';

const Stack = createStackNavigator();

const webView = (url) => {
  return (
    <WebView
      useWebKit
      originWhitelist={['*']}
      style={{ marginTop: Constants.statusBarHeight, padding: 15 }}
      source={{ uri: url }}
      domStorageEnabled
      allowUniversalAccessFromFileURLs
      allowFileAccessFromFileURLs
      allowFileAccess
    />
  );
};

const TermsAndConditions = () => webView('https://www.termsandconditionsgenerator.com/live.php?token=gAlGbyPUMxUrk1MtndHsZosmbzfZgiWd');
const PrivacyPolicy = () => webView('https://www.termsfeed.com/live/7b09be36-e69d-40c9-a85c-a385fe92a19b');

const SetingsNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName="SettingsList" screenOptions={ScreenOptions}>
      <Stack.Screen name="SettingsList" component={Settings} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default SetingsNavigator;
