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
import AsyncStorage from '@react-native-community/async-storage';
import { Badge } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from '../../components/Icon';
import moment from 'moment';
  
const PaymentRequestScreen = ({navigation}) => { 

    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;
    const [data,setData] = useState([]);
    const [status,setStatus] = useState();
    const [spining,setSpining] = useState(true);
    const [userData,setUserData] = useState('');
    

    useEffect(async () => {

        setUserData(JSON.parse(await AsyncStorage.getItem('user_info')));
       

        const token = await AsyncStorage.getItem('token');
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        await DepositRequestList({},headers)
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
                    height: 1,  
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
    const getListViewItem = async (item) => {  
        
        const token = await AsyncStorage.getItem('token');
        const user = JSON.parse(await AsyncStorage.getItem('user_info'));
        if (item.status != 2 && user.is_vendor) {

            let headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            Alert.alert(
                "Recharge amount",
                `${Theme.currency} ${item.deposit_amount.toFixed(2)}`,
                [{ 
                    text: "Close", 
                    style: "cancel" 
                },{
                    text: "Reject",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },{ 
                    text: "Accept", 
                    onPress: () => {

                        DepositRequestReply({
                            deposit_id: item.id,
                            status:1
                        },headers).then(res => {
                            navigation.navigate('OTPScreen',{
                                phone_number: item.user.mobile_number,
                                id: item.id
                            })
                        }).catch(err => {
                            Alert.alert(err.response.data.message,`${Theme.currency} ${item.deposit_amount.toFixed(2)}`)
                        })
                    },
                    style: "default"
                },]
            );
        }
    } 
    const renderVendor = (item) => {
    
        const logo = userData.is_vendor? item.user.avatar : item.vendor.avatar;
        
        let profile = "";
        if (logo) {
            profile = {uri: logo}
        }else{
            profile = Icon.profile
        }

        return (

            <TouchableOpacity onPress={getListViewItem.bind(this,item)}>  
            <View style={styles.main} >
                <View style={styles.section}>
                    <View style={styles.firstPart} >
                     
                        <ImageBackground 
                        source={profile} 
                        style={styles.profileImage} 
                        imageStyle={{ borderRadius: 20}}/>

                        <View style={{flex:1}} >
                            <Text style={{marginLeft:15,fontWeight:'bold',fontSize:15}} >
                                { userData.is_vendor?item.user.name:item.vendor.name}
                            </Text>
                            <Text style={{marginLeft:15,color:'#696969'}} >
                               { userData.is_vendor?item.user.mobile_number:item.vendor.mobile_number}
                            </Text>
                        </View>
                        <View style={{textAlign:'right',marginRight:15}} >
                            <Text>{Theme.currency} {item.deposit_amount.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2,flexDirection:'row',marginLeft:18}}>
                  <View style={{flex: 3,marginTop:8}}>
                        <Text style={{color:'grey',fontSize:12}}>{moment(item.created_at).format("DD MMM YYYY")}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Badge 
                            value={<Text style={{color:'white',margin:5}}>{getStatus(item.status).text}</Text>} 
                            badgeStyle={{height:30,backgroundColor: 'purple'}}
                            />
                       
                    </View>
                 </View>
            </View>
            </TouchableOpacity>  
        );
    }
    const renderUser = (item) => {
    
        const logo = userData.is_vendor? item.user.avatar : item.vendor.avatar;
        
        let profile = "";
        if (logo) {
            profile = {uri: logo}
        }else{
            profile = Icon.profile
        }

        return (
            <View style={styles.main} >
                <View style={styles.section}>
                    <View style={styles.firstPart} >
                     
                        <ImageBackground 
                        source={profile} 
                        style={styles.profileImage} 
                        imageStyle={{ borderRadius: 20}}/>

                        <View style={{flex:1}} >
                            <Text style={{marginLeft:15,fontWeight:'bold',fontSize:15}} >
                                { userData.is_vendor?item.user.name:item.vendor.name}
                            </Text>
                            <Text style={{marginLeft:15,color:'#696969'}} >
                               { userData.is_vendor?item.user.mobile_number:item.vendor.mobile_number}
                               
                            </Text>
                        </View>
                        <View style={{textAlign:'right',marginRight:15}} >
                            <Text>{Theme.currency} {item.deposit_amount.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2,flexDirection:'row',marginLeft:18}}>
                    <View style={{flex: 3,marginTop:8}}>
                        <Text style={{color:'grey',fontSize:12}}>{moment(item.created_at).format("DD MMM YYYY")}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Badge 
                            value={<Text style={{color:'white',margin:5}}>{getStatus(item.status).text}</Text>} 
                            badgeStyle={{height:30,backgroundColor: 'purple'}}
                            />
                       
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
            ):  data.length ? (
                <FlatList  
                    data={data}  
                    keyExtractor={item => item.id}
                    renderItem={({item}) => userData.is_vendor?renderVendor(item):renderUser(item)}    
                    
                    />  
            ):(
                <View style={{height: Height,width: Width ,borderRadius:5,justifyContent:'center',alignItems: "center",backgroundColor:Theme.themeColor,}}>
                    <Text> You have not any request</Text>
                </View>
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