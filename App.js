import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch, Provider } from 'react-redux';
import * as Location from 'expo-location';
import store from './src/redux/store';
import MainTabBar from './src/navigation/navbar';
import Login from './src/components/login';
import { setLoginResult, getJWT, setIsLoading } from './src/redux/globalSlice';

const App = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const setUp = async () => {
    let item = await AsyncStorage.getItem('LOGIN_RESULT_VALUE');
    if (item) {
      item = JSON.parse(item);
      dispatch(setLoginResult(item));
      dispatch(getJWT(item.accessToken, item.user.email));
    } else {
      dispatch(setIsLoading(false));
    }
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    const position = await Location.getCurrentPositionAsync({});
    await setLocation(position);
    console.log(position, errorMsg);
  };

  React.useEffect(() => {
    setUp();
  }, []);

  const login = useSelector((state) => state.global.loginResult);

  let displayComponent = (login && login.type === 'success') ? (<MainTabBar />) : (<Login />);
  displayComponent = login && !login.isLoading ? displayComponent : <></>;

  return (
    <>
      <StatusBar style="auto" />
      {displayComponent}
    </>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
