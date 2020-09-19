import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import store from './src/redux/store';

import {
  setLoginResult,
  getJWT,
  setIsLoading,
  loadStateFromBackend,
  getLocationOnStartup,
} from './src/redux/globalSlice';

const App = () => {
  const dispatch = useDispatch();

  const setUp = async () => {
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
