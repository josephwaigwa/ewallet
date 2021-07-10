/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//#2e3973
import React,{useState,useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/screens/login/index';
import Registration from './src/screens/registration/index';
import MobileNumber from './src/screens/registration/MobileNumber';
import OTP from './src/screens/registration/OTP';
import SignUpSubmit from './src/screens/registration/SignUpSubmit';
import HomeScreen from './src/screens/home/HomeScreen';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import DrawerNavigationRoutes from './src/screens/DrawerNavigationRoutes';
import Theme from './src/constant/Theme'
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import ForgotPasswordScreen from './src/screens/forgot';
import ForgotPasswordOTPScreen from './src/screens/forgot/otp';
import ForgotPasswordNewPasswordScreen from './src/screens/forgot/NewPassword';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
    <Stack.Screen
        name="RegisterScreen"
        component={Registration}
        options={{headerShown: false}}
    />
    <Stack.Screen
        name="MobileNumber"
        component={MobileNumber}
        options={{
            title: 'Welcome to BULSHO',
            headerStyle:{
                backgroundColor:Theme.themeColor2
            },
            headerTintColor: Theme.text2Color,
            headerTitleStyle: {
                left:10
            }
        }}
    />
    <Stack.Screen
        name="OTP"
        component={OTP}
        options={{
            title: 'OTP Authorization',
            headerStyle:{
                backgroundColor:Theme.themeColor2
            },
            headerTintColor: Theme.text2Color,
            headerTitleStyle: {
                left:10
            }
        }}
    />
    <Stack.Screen
        name="SignUpSubmit"
        component={SignUpSubmit}
        options={{
            title: 'Finish',
            headerLeft: null,
            headerStyle:{
                backgroundColor:Theme.themeColor2
            },
            headerTintColor: Theme.text2Color,
            headerTitleStyle: {
                left:'40%'
            }
        }}
    />
    <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
    />
    <Stack.Screen
        name="ForgotPasswordOTPScreen"
        component={ForgotPasswordOTPScreen}
        options={{headerShown: false}}
    />
    <Stack.Screen
        name="ForgotPasswordNewPasswordScreen"
        component={ForgotPasswordNewPasswordScreen}
        options={{headerShown: false}}
    />
    </Stack.Navigator>
  );
};

const App = () => {

    const getToken = async () => {
        const token = await messaging().getToken();
        
    }
    useEffect(() => {
        getToken()
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(remoteMessage.notification.title,remoteMessage.notification.body );
        });


        messaging().onNotificationOpenedApp(remoteMessage => {
           
        });

    // Check whether an initial notification is available
        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
            
           
            }
        
        });
    }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
