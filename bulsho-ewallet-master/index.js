/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import { NetworkProvider } from 'react-native-offline';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  //console.log('Message handled in the background!', remoteMessage);
});

const Root = () => (
  <NetworkProvider>
    <App />
  </NetworkProvider>
);


AppRegistry.registerComponent(appName, () => Root);
