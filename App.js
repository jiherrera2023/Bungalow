import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch, Provider } from 'react-redux';
import store from './src/redux/store';

import MainTabBar from './src/navigation/navbar';
import Login from './src/components/login';
import { setLoginResult } from './src/redux/globalSlice';

const App = () => {
  const dispatch = useDispatch();
  const readLoginFromStorage = async () => {
    const item = await AsyncStorage.getItem('LOGIN_RESULT_VALUE');
    dispatch(setLoginResult(JSON.parse(item)));
  };

  React.useEffect(() => {
    readLoginFromStorage();
  }, []);

  const login = useSelector((state) => state.global.loginResult);

  const displayComponent = (login && login.type === 'success') ? (<MainTabBar />) : (<Login />);

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
