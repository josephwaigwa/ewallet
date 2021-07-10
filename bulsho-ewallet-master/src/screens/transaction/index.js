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
import { DepositRequestList,DepositRequestReply } from '../../services/DepositService';
import { TransactionList } from '../../services/TransactionService'
import AsyncStorage from '@react-native-community/async-storage';
import { Badge } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from '../../components/Icon';
import moment from 'moment';
  
const PaymentRequestScreen = ({navigation}) => { 

    const Width = Dimensions.get('window').width;
    const [data,setData] = useState([]);
    const [userData,setUserData] = useState('');
    const [status,setStatus] = useState();
    const [spining,setSpining] = useState(true);
    
    useEffect(async () => {

        const token = await AsyncStorage.getItem('token');
        const userInfo = await AsyncStorage.getItem('user_info');
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        
        await setUserData(JSON.parse(userInfo));
        await TransactionList(headers)
        .then(res => {
            setData(res.data.data)
        }).catch(err =>{

        })
        setSpining(false);
    },[])
  
    const renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 2,  
                    width: Width,  
                    backgroundColor: Theme.themeColor2,   
                }}  
            />  
        );  
    }; 
    const getStatus = (status) => {
        
        switch (status) {
            case 0:
                return {
                    color: 'yellow',
                    text: 'Pending'
                }
            break;
            case 1:
                return {
                    color: 'green',
                    text: 'Accepted'
                }
            break;
            case 2:
                return {
                    color: 'green',
                    text: 'Completed'
                }
            break;
            case 3:
                return {
                    color: 'red',
                    text: 'Rejected'
                }
            break;
            
        }            
    }  
    const renderView = (item) => {

        const logo = userData.id === item.sender.id ? item.receiver.avatar : item.sender.avatar;
        let profile = "";
        if (logo) {
            profile = {uri: logo}
        }else{
            profile = Icon.profile
        }
        return (
            <View style={styles.main}>
                <View style={styles.section}>
                    <View style={styles.firstPart} >
                        <ImageBackground 
                        source={profile} 
                        style={styles.profileImage} 
                        imageStyle={{ borderRadius: 20}}/>
                        <View style={{flex:1}} >
                            <Text style={{marginLeft:15,fontWeight:'bold',fontSize:15}} >
                                { userData.id === item.sender.id ? 'Paid to' : 'Received from' }
                            </Text>
                            <Text style={{marginLeft:15,color:'#696969'}} >
                                { userData.id === item.sender.id ? item.receiver.name : item.sender.name }
                                
                            </Text>
                             <Text style={{marginLeft:15,color:'#696969'}} >
                                
                                { userData.id === item.sender.id ? item.receiver.mobile_number : item.sender.mobile_number }
                            </Text>
                        </View>
                        <View style={{textAlign:'right',marginRight:15}} >
                            <Text>{Theme.currency} {item.transaction_amount.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1,flexDirection:'row',marginLeft:18}}>
                    <View style={{flex: 3}}>
                        <Text style={{color:'grey',fontSize:12}}>{moment(item.created_at).format("DD MMM YYYY")}</Text>
                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{color:'#000000',fontSize:14,textAlign:'right',marginRight:15}}>
                            Bal: {Theme.currency}{ userData.id === item.sender.id ? item.sender_bal.toFixed(2) : item.receiver_bal.toFixed(2) }
                        </Text>
                    </View>
                 </View>
            </View>
        );
    }

    return (  
        <View style={styles.container}>  
            {spining?(
                <Spinner
                  visible={spining}
                  textContent={'Loading...'}
                  textStyle={{color: '#FFF'}}
                />
            ):(
                <FlatList  
                    data={data}  
                    //keyExtractor={item => item.id}
                    renderItem={({item}) => renderView(item)}  
                />  
            )}
            
        </View>  
        );  
      
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1, 
      //  alignItems: "center",
        //width:'100%',
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
        height:100,
        marginVertical: 5,
        marginHorizontal:8,
        borderRadius:15,
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