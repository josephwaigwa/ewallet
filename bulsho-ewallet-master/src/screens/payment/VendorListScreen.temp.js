import React, { Component, useEffect,useState } from 'react';  
import { 
    FlatList,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert } from 'react-native';  
import Theme from '../../constant/Theme'
import OTPInputView from 'react-native-otp-input'
import * as ProfileService from '../../services/ProfileService';
import AsyncStorage from '@react-native-community/async-storage';
import { Badge,Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import filter from 'lodash.filter'
  
const PaymentRequestScreen = ({navigation}) => { 

    const Width = Dimensions.get('window').width;
    const [data,setData] = useState([]);
    const [fulldata,setFulldata] = useState([]);
    const [userData,setUserData] = useState('');
    const [status,setStatus] = useState();
    const [spining,setSpining] = useState(true);
    const [query,setQuery] = useState("");
    const [autoFocus,setAutoFocus] = useState(false);
    
    useEffect(async () => {

        setInterval(() => {
          setSpining(false);
        }, 2000);

        await getDataFromServer();
       
    },[])

    const getDataFromServer = async () => {

        const token = await AsyncStorage.getItem('token');
        const userInfo = await AsyncStorage.getItem('user_info');
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        await setUserData(JSON.parse(userInfo));
        await ProfileService.vendorList(headers)
        .then(res => {
            setData(res.data)
            setFulldata(res.data)
        }).catch(err =>{

        })
    }
  
    const renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: Width,  
                    backgroundColor: Theme.themeColor2,   
                }}  
            />  
        );  
    }; 
    const nextScreen = (item) => {
        navigation.navigate('PaymentScreen',{
            mobile_number: item.mobile_number
        })
    }
    const handleSearch = keyword => {

        if (keyword == "") {
            getDataFromServer()

        }else{
         
            let filterData = fulldata.filter(user => {

                if (user.name && user.name.toLowerCase().includes(keyword)) {
                        
                    return user.name.toLowerCase().includes(keyword)
                }
                if (user.mobile_number && user.mobile_number.toLowerCase().includes(keyword)) {
                        
                    return user.mobile_number.toLowerCase().includes(keyword)
                }

            })

            setData(filterData.length?filterData:data);

        }

        
    }
    const contains = ({ name, mobile_number }, query) => {
         
        if (name.includes(query) || mobile_number.includes(query)) {
            return true
        }
        return false
    }
    const renderHeader = () => (
        <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <Input
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={ value => handleSearch(value) }
              clearButtonMode='always'
              status='info'
              placeholder='Search'
              autoFocus={autoFocus}
              //value={query}
              style={{
                borderRadius: 25,
                borderColor: '#333',
                backgroundColor: '#fff'
              }}
              textStyle={{ color: '#000' }}
            />
          </View>
    )
   
    return (  
        <View style={styles.container}>  


            {spining? (<Spinner
              visible={spining}
              textContent={'Loading...'}
              textStyle={{color: '#FFF'}}
            />):(
            <View>

            <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Input
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={ value => handleSearch(value) }
              clearButtonMode='always'
              status='info'
              placeholder='Search'
              autoFocus={autoFocus}
              //value={query}
              style={{
                borderRadius: 25,
                borderColor: '#333',
                backgroundColor: '#fff'
              }}
              textStyle={{ color: '#000' }}
            />
          </View>
            <FlatList  
                data={data}  
                keyExtractor={item => item.id}
               // ListHeaderComponent={data.length?renderHeader:null}
                renderItem={({item}) =>
                    <TouchableOpacity onPress={() => nextScreen(item)}>  
                    <View style={{
                        height:80,
                        width: Width ,
                        borderRadius:5,
                        backgroundColor:Theme.themeColor,
                    }}>
                    
                    <Text style={{paddingLeft:10,paddingTop:10}} >
                        Agent Name : { item.name }
                    </Text>
                    <Text style={{paddingLeft:10}}>
                        Mobile Number : {item.mobile_number }
                    </Text>
                 
                    </View>
                    </TouchableOpacity>
                }  
                ItemSeparatorComponent={renderSeparator}  
                /> 
            </View>)}
            
             
        </View>  
        );  
      
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1, 
        alignItems: "center",
        width:'100%',
        backgroundColor: Theme.themeColor2
    },  
    item: {  
        padding: 10,
        fontSize: 18,  
    },  
})  
  
  
export default PaymentRequestScreen