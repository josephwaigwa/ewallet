import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './home/HomeScreen';
import TransferScreen from './transfer/TransferScreen';
import TransferToAdminScreen from './transfer/TransferToAdminScreen';
import PaymentScreen from './payment/PaymentScreen';
import Transaction from './transaction';
import VendorListScreen from './payment/VendorListScreen';
import Profile from './Profile';
import PaymentRequestScreen from './paymentRequest/PaymentRequestScreen';
import OTPScreen from './paymentRequest/OTPScreen';
import QrCodeScreen from './qrcode/QrCodeScreen';
import QrCodeScannerScreen from './qrcode/QrCodeScannerScreen';
import Theme from '../constant/Theme'
import { Dimensions } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Width = Dimensions.get('window').width;

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false,enabled: false}}
        />

        <Stack.Screen
            name="TransferScreen"
            component={TransferScreen}
            options={{
                title: 'Transfer',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="TransferToAdminScreen"
            component={TransferToAdminScreen}
            options={{
                title: 'Transfer To Admin',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
                title: 'Recharge',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="VendorListScreen"
            component={VendorListScreen}
            options={{
                title: 'Recharge',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="OTPScreen"
            component={OTPScreen}
            options={{
                headerShown: false
                
            }}
        />
        <Stack.Screen
            name="PaymentRequestScreen"
            component={PaymentRequestScreen}
            options={{
                title: 'Recharge Request',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="Transaction"
            component={Transaction}
            options={{
                title: 'Transaction',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
                title: 'Profile',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="QrCodeScreen"
            component={QrCodeScreen}
            options={{
                title: 'Qr Code',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
        <Stack.Screen
            name="QrCodeScannerScreen"
            component={QrCodeScannerScreen}
            options={{
                title: 'Scan & Pay',
                headerStyle:{
                    backgroundColor:Theme.themeColor2
                },
                headerTintColor: Theme.text2Color,
                
            }}
        />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen
            name="homeScreenStack"
            options={{drawerLabel: 'Home'}}
            component={homeScreenStack}
        />
        
    </Drawer.Navigator>
  );
};

export default homeScreenStack;