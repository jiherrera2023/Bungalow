import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  SettingsPage,
  NavigateRow,
  BaseRow,
  CheckRow,
  SwitchRow,
} from 'react-native-settings-view';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';

import { setLoginResult } from '../../redux/globalSlice';
import {
  API_ROOT, API_SUBLET,
} from '../../configs';

export default (props) => {
  const jwt = useSelector((state) => state.global.jwt);
  const heartClicked = () => {
    console.log('JWT is', jwt);
    const sublet = {
      title: 'test sublet title',
      address: 'test sublet address',
      description: 'This is a test sublet',
      bathrooms: 1,
      price: 500,
      footage: 100,
      bedrooms: 100,
    };
    axios.post(API_ROOT + API_SUBLET, sublet, { headers: { authorization: jwt } }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'whitesmoke',
      padding: 15,
      marginTop: Constants.statusBarHeight,
    },
    heroContainer: {
      marginTop: Constants.statusBarHeight,
      marginBottom: 50,
      paddingVertical: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#C1DCE7',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#ccc',
      flexDirection: 'row',
      borderRadius: 25,
    },
    heroImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: '#666',
      marginHorizontal: 20,
    },
    heroTitle: {
      color: '#222',
      fontSize: 24,
    },
    heroSubtitle: {
      color: '#666',
      fontSize: 14,
    },
    signOutbutton: {
      borderRadius: 15,
    },
    signOutContainer: {
      marginHorizontal: 15,
      marginBottom: 50,
      backgroundColor: 'whitesmoke',
    },
  });

  const dispatch = useDispatch();
  const clearLoginInfo = async () => {
    await AsyncStorage.removeItem('LOGIN_RESULT_VALUE');
    dispatch(setLoginResult({ isLoading: false }));
  };

  const userInfo = useSelector((state) => state.global.loginResult.user);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <Image source={{ uri: userInfo.photoUrl }} style={styles.heroImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>{userInfo.name}</Text>
            <Text style={styles.heroSubtitle}>{userInfo.email}</Text>
          </View>
        </View>
        <SettingsPage>
          <NavigateRow
            text="Terms and conditions"
            leftIcon={{
              name: 'file-document',
              type: 'material-community',
            }}
            onPress={() => props.navigation.navigate('Settings', { screen: 'TermsAndConditions' })}
          />
          <NavigateRow
            text="Privacy Policy"
            leftIcon={{
              name: 'folder-lock',
              type: 'material-community',
            }}
            onPress={() => props.navigation.navigate('Settings', { screen: 'PrivacyPolicy' })}
          />
          <NavigateRow
            text="Contact us"
            leftIcon={{
              name: 'users',
              type: 'font-awesome',
            }}
            onPress={() => heartClicked()}
          />
          <CheckRow
            text="Notifications"
            checked
            leftIcon={{
              name: 'ios-notifications',
              type: 'ionicon',
            }}
            onValueChange={(isChecked) => console.log('checked', isChecked)}
          />
          <SwitchRow
            text="Do not disturb"
            enabled
            leftIcon={{
              name: 'do-not-disturb',
              type: 'material-community',
            }}
            onValueChange={(isEnabled) => console.log('checked', isEnabled)}
          />
          <BaseRow
            text="1.0.0"
            leftIcon={{
              name: 'tag',
              type: 'font-awesome',
            }}
            rightContent={<Text>1.0.0</Text>}
          />
        </SettingsPage>
      </View>
      <Button
        title="Sign Out"
        type="outline"
        buttonStyle={styles.signOutButton}
        containerStyle={styles.signOutContainer}
        onPress={clearLoginInfo}
      />
    </>
  );
};
