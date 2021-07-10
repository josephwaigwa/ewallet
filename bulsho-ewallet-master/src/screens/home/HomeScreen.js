import React, {useState,useEffect}from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  TouchableOpacity,
  SafeAreaView, 
  ScrollView,
  Alert,
  RefreshControl,
  Dimensions
} from "react-native";
import Icon from '../../components/Icon';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import {  userInfo } from '../../services/LoginService';
import {  FCM } from '../../services/ProfileService';
import styles from './HomeStyle'
import messaging from '@react-native-firebase/messaging';
import Theme from '../../constant/Theme';

const HomeScreen = (props) => {

    const [state,setState] = useState();
    const [refreshing, setRefreshing] = useState(false);

    const windowHeight = Dimensions.get('window').height;

    useEffect(async () => {
        await getToken()
        await getData()
    },[])
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getDataFromAPI()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getToken = async () => {
        
        const fcmtoken = await messaging().getToken();
        const token = await AsyncStorage.getItem('token');
        
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        await FCM({fcm_token:fcmtoken},headers)

    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const getDataFromAPI = async () => {

        const token = await AsyncStorage.getItem('token');
        

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        
        userInfo(headers).then(async res => {

            await AsyncStorage.setItem('user_info', JSON.stringify(res.data[0]));
            await getData();
                
        }).catch(err => {
            
        })
    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user_info')
            if(value !== null) {
                
                setState(JSON.parse(value));
            }
        } catch(e) {
            // error reading value
        }
    }
    const logout = async () => {

        AsyncStorage.clear();
        props.navigation.replace('Auth');
        
    }
  return (
    <View style={[styles.container, {
      flexDirection: "column"
    }]}>
      <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
      <View style={styles.headerSection}>
          <View style={styles.header}> 
              <View style={styles.subHeader}>
                <ImageBackground source={state && state.avatar?{uri:state.avatar}: Icon.profile} style={styles.profileImage} imageStyle={{ borderRadius: 20}}/>
                <View>
                  <Text style={styles.greeting}>Welcome Back </Text>
                  <Text style={styles.userText}>{state?state.name:'Guest'}</Text>
                </View>
                
              </View>
              <View style={styles.logout}>
                <TouchableOpacity onPress={() => logout()}>
                <FontIcon name='sign-out-alt' size={15} color='#ffff' style={styles.iconStyle}/>

                
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('QrCodeScreen',{
                    mobile_number: state.mobile_number
                })}>
                <FontIcon name='qrcode' size={15} color='#ffff' style={{margin:10}}/>
               
                </TouchableOpacity>
                
              </View>
          </View>
          <View style={styles.walletArea}>
            <Text style={styles.walletAmount}> {Theme.currency} {
                state && 
                state.wallet && 
                state.wallet.wallet ?state.wallet.wallet.toFixed(2) : 0.00}</Text>
          </View>
      </View>


      <View style={styles.transactionAreaContainer} >
        <View style={styles.transactionSection}>
              <View style={[styles.item,{flexDirection: "row"}]}>
                <FontIcon name='arrow-up' size={20} color='#2edac5' style={styles.transactionIconStyle}/>
                <View>
                  <Text style={styles.transactionText}>Income </Text>
                  <Text style={styles.transactionText2}> {Theme.currency} { 
                    state &&
                    state.income.length &&
                    state.income.[0] &&
                    state.income.[0].amount ? state.income.[0].amount.toFixed(2):0.00
                  }</Text>
                </View>
              </View>
              <View style={[styles.item,{flexDirection: "row"}]}>
                <FontIcon name='arrow-down' size={20} color='#a17dff' style={styles.outcomeIcon}/>
                <View>
                  <Text style={styles.outcomeText}>Outcome </Text>
                  <Text style={styles.outcomeValue}> {Theme.currency} { 
                    state &&
                    state.outcome.length &&
                    state.outcome.[0] &&
                    state.outcome.[0].amount ? state.outcome.[0].amount.toFixed(2):0.00
                  }</Text>
                </View>
              </View>
              <View style={[styles.item,{flexDirection: "row"}]}>
              <TouchableOpacity onPress={() => props.navigation.navigate('Transaction')}>
                <View>
                  <Text style={styles.transactionAreaText}>Transaction
                   {"   "}<FontIcon name='arrow-right' size={10} color='#ffff' />
                  </Text>
                </View>
              </TouchableOpacity>
              </View>             
          </View>
      </View>
      <View style={styles.footer}>
          <View style={styles.footerCard}>

              <View style={styles.item}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} >
                <ImageBackground source={Icon.accountsIcon} style={styles.imageIcon}/>
                <Text style={styles.iconText} > {" "}{" "}Profile</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.item}>
                <TouchableOpacity onPress={() => props.navigation.navigate('TransferScreen')} >
                  <ImageBackground source={Icon.transfer} style={styles.imageIcon}/>
                  <Text style={styles.iconText}>Transfer</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.item}>
                <TouchableOpacity onPress={() => props.navigation.navigate('QrCodeScannerScreen')}>
                  <ImageBackground source={Icon.qrcode} style={styles.imageIcon}/>
                  <Text style={styles.iconText}>QR Pay</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.item}>
                <TouchableOpacity onPress={() => props.navigation.navigate('VendorListScreen')}>
                  <ImageBackground source={Icon.payment} style={styles.imageIcon}/>
                  <Text style={styles.iconText}>Recharge</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.item}>
                <TouchableOpacity>
                  <ImageBackground source={Icon.game} style={styles.imageIcon}/>
                  <Text style={styles.iconText}>Play Ludo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.item}>
                <TouchableOpacity onPress={() => props.navigation.navigate('PaymentRequestScreen')}>
                  <ImageBackground source={Icon.betting} style={styles.imageIcon}/>
                  <Text style={styles.iconText}>Requests</Text>
                </TouchableOpacity>
              </View>
             

          </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
};



export default HomeScreen;