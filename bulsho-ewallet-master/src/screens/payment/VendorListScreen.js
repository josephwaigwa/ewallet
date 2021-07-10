import React, { Component, useEffect,useState } from 'react';  
import { 
    FlatList,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Alert } from 'react-native';  
import Theme from '../../constant/Theme'
import OTPInputView from 'react-native-otp-input'
import * as ProfileService from '../../services/ProfileService';
import AsyncStorage from '@react-native-community/async-storage';
import { Badge,Input } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import filter from 'lodash.filter'
import Icon from '../../components/Icon';
  
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

        await getDataFromServer();
        setSpining(false);
       
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
            console.log(res.data);
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
    const renderView = (item) => {

        let profile = "";
        if (item.avatar) {
            profile = {uri: item.avatar}
        }else{
            profile = Icon.profile
        }
        return (
            <TouchableOpacity onPress={() => nextScreen(item)}>  
            <View style={styles.main}>
                <View style={styles.section}>
                    <View style={styles.firstPart} >
                        <ImageBackground 
                        source={profile} 
                        style={styles.profileImage} 
                        imageStyle={{ borderRadius: 20}}/>
                        <View style={{flex:1}} >
                            <Text style={{marginLeft:15,fontWeight:'bold',fontSize:15,lineHeight: 40}} >
                               { item.name }
                            </Text>
                            <Text style={{marginLeft:15,color:'#696969'}} >
                                { item.mobile_number }
                            </Text>
                        </View>
                       
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
   
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
                renderItem={({item}) => renderView(item) }  
                /> 
            </View>)}
            
             
        </View>  
        );  
      
}  
  

const styles = StyleSheet.create({  
    container: {  
        flex: 1, 
        backgroundColor: Theme.themeColor2
    },  
    item: {  
        padding: 10,
        fontSize: 18,  
    },  
    profileImage:{
        width:40,
        height:40,
        //marginRight:15
    },
    main:{
        height:80,
        //marginBottom:10,
        //marginVertical: 5,
        //marginHorizontal:8,
        //borderRadius:15,
        backgroundColor:Theme.themeColor,
    },
    section:{
        flex: 1,
        flexDirection:'row',
        marginBottom:35,
        marginTop:15
    },
    firstPart:{
        flex:1 ,
        flexDirection:'row',
        marginLeft:15
    }
})  
  
  
export default PaymentRequestScreen