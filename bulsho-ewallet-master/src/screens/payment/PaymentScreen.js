import React ,{useState} from 'react'
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import styles from './Style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { DepositRequest } from '../../services/DepositService';
import Theme from '../../constant/Theme'

const errInit = {
    mobile_numberError:'',
    amountError:''
};

const PaymentScreen = ({navigation,route}) => {

    const [animating,setAnimating] = useState(false);
    const [state,setState] = useState({
        mobile_number: route.params.mobile_number,
        amount:''
    });
    
    const [errState,setErrState] = useState(errInit);

    const clear = () => {
        setErrState(errInit)
    }

    const sendRequest = async () => {

        setAnimating(true);
        const token = await AsyncStorage.getItem('token');

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

       await DepositRequest({
            mobile_number: state.mobile_number,
            amount: state.amount
        },headers)
        .then(async res => {

            Alert.alert(
                "Success",
                "Request Sended",[{
                    text: "Back to home",
                    onPress: () => navigation.navigate('HomeScreen')
                }]
            );

        }).catch(err => {

            Alert.alert(
                "Error",
                "Request Sending Failed",[{
                    text: "Back to home",
                    onPress: () => navigation.navigate('HomeScreen')
                },
                {
                    text: "Cancel",
                    style: "cancel"
                },
                ]
            );
        })
        setAnimating(false);
    }
    

    return (
        <View style={styles.container}>
        <SafeAreaView style={{flex:1}}> 
        <ScrollView>
            <View style={[styles.heading,{
                    alignItems:'center'
                }]}>
                
            </View>
            <View style={styles.subHeading}>
                

                <View style={styles.inputView}>
                   <Input
                    label="Enter Agent Phone Number"
                    labelStyle={{fontSize:12}}
                    placeholder="Enter Agent Phone Number"
                    value={state.mobile_number}
                    style={styles.TextInput}
                    keyboardType = "number-pad"
                    errorMessage={errState.mobile_numberError}
                    errorStyle={{color:'grey'}}
                    onChangeText={value => setState({...state,mobile_number:value})}
                    leftIcon={
                        <Icon
                          name='phone'
                          size={16}
                          color='black'
                        />
                    }
                    />       
                </View>
                 <View style={styles.inputView}>
                 <Input
                    label="Recharge Amount"
                    labelStyle={{fontSize:12}}
                    placeholder="Enter amount"
                    value={state.amount}
                    style={styles.TextInput}
                    keyboardType = "number-pad"
                    errorMessage={errState.amountError}
                    errorStyle={{color:'grey'}}
                    onChangeText={value => setState({...state,amount:value})}
                    leftIcon={
                        <Icon
                          name='money'
                          size={16}
                          color='black'
                        />
                    }
                    />  
                     
                </View>
                
                
                {animating?(
            
                    <ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
                ):(
                <TouchableOpacity style={styles.loginBtn} onPress={() => sendRequest()}>
                    <Text style={styles.loginText} >Request</Text>
                </TouchableOpacity>
                )}
            </View>
            <View style={styles.footer}>
                
            </View>
            </ScrollView>
            </SafeAreaView>
        </View>
    )


}


export default PaymentScreen;