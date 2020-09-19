import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch, Provider } from 'react-redux';
import store from './src/redux/store';

import MainTabBar from './src/navigation/navbar';
import Login from './src/components/login';
import { setLoginResult, getJWT } from './src/redux/globalSlice';
import AddSublet from './src/components/addSublet';

const App = () => {
  const dispatch = useDispatch();
  const readLoginFromStorage = async () => {
    let item = await AsyncStorage.getItem('LOGIN_RESULT_VALUE');
    if (item) {
      item = JSON.parse(item);
      dispatch(getJWT(item.accessToken, item.user.email));
      dispatch(setLoginResult(item));
    } else {
      item = { isLoading: true };
    }
  };

  React.useEffect(() => {
    readLoginFromStorage();
  }, []);

  const login = useSelector((state) => state.global.loginResult);

  let displayComponent = (login && login.type === 'success') ? (<MainTabBar />) : (<Login />);
  displayComponent = login && !login.isLoading ? displayComponent : <></>;

  return (
    <>
      <StatusBar style="auto" />
      <AddSublet />
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
