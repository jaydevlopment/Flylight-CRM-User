import React, { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native'
import { Provider } from 'react-redux';
import { store, persistor } from './app/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'
import AuthStack from './app/navigations/authStack';
import RootNavigation from './app/navigations/index'
import { useNetInfo } from "@react-native-community/netinfo";
export default function App() {
  const netInfo = useNetInfo();
  useEffect(() => {
    if (netInfo && netInfo.isConnected==false) {
      Alert.alert('Internet Connectivity Failed')
    }
  }, [netInfo])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigation />
          {/* <AuthStack /> */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


