import React, {useEffect,useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import {OTPStyle as styles} from './Style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import { DepositRequestOtpValidate } from '../../services/DepositService';
import AsyncStorage from '@react-native-community/async-storage';
import Theme from '../../constant/Theme'

const OTPScreen = ({navigation,route}) => {


    const {phone_number,id} = route.params;
    const [password, setPassword] = useState("");
    const [animating,setAnimating] = useState(false);

    const onContinue = async () => {
        setAnimating(true);
        if (password) {
            
            const token = await AsyncStorage.getItem('token');
            let headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            await DepositRequestOtpValidate({password:password,id},headers)
            .then(res => {

                Alert.alert(
                    "Success",
                    res.data.message,[
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('PaymentRequestScreen'),
                        style: "cancel"
                    }]
                );

            }).catch(err => {
        
                Alert.alert(
                    "Error",
                    "Wrong Password",[
                    {
                        text: "OK",
                        style: "cancel"
                    }]
                );
            })
                
        }else{

            Alert.alert(
                "Error",
                "Wrong Password",[
                {
                    text: "OK",
                    style: "cancel"
                }]
            );
        }
        setAnimating(false);
    }

    return(
        <View style={styles.main}>
        <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{alignItems: 'center'}} >
        <View style={styles.container}>
            
            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}> Enter your password </Text>
                <View style={styles.inputView}>
                    <Input
                        label="Password"
                        placeholder="Enter Your Password"
                        style={styles.TextInput}
                        secureTextEntry={true}
                        errorStyle={{color:'red'}}
                        labelStyle={{fontSize:12}}
                        onChangeText={value => setPassword(value)}
                        leftIcon={
                                <Icon
                                name='lock'
                                size={16}
                                color={Theme.iconColor}
                                />}
                    />
                </View>
                
                {animating?(
            
                    <ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
                    ):(
                    <TouchableOpacity style={styles.loginBtn} onPress={onContinue.bind(this)}>
                        <Text style={styles.loginText} >Continue</Text>
                    </TouchableOpacity>
                )}
                
            </View>
            <View style={styles.footer}>
                
            </View>
        </View>
            </ScrollView>
        </View>
    );
}

export default OTPScreen