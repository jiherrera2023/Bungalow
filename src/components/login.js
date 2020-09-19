import React from 'react';
import {
  ImageBackground, StyleSheet, Image, View,
} from 'react-native';
import {
  SocialIcon,
} from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/globalSlice';

import background from '../../assets/loginBackground.jpg';
import logo from '../../assets/splash.png';

const styles = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#C1DCE7',
    padding: 0,
    borderRadius: 25,
    width: '70%',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 176,
    height: 200,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#333',
    width: '95%',
    alignSelf: 'center',
  },
});
const Login = () => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state) => state.global.isLoggingIn);
  return (
    <ImageBackground source={background} style={styles.image}>
      <View style={styles.loginContainer}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <SocialIcon
          title="Sign In With Google"
          button
          loading={isLoggingIn}
          style={styles.button}
          fontStyle={{ color: 'white' }}
          iconStyle={{ color: 'white' }}
          underlayColor="rbga(0,0,0,0)"
          type="google"
          onPress={() => { dispatch(signIn()); }}
        />
      </View>
    </ImageBackground>
  );
};

export default Login;
