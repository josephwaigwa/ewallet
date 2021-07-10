import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from "react-native";
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { Forgot } from '../../services/ForgotPasswordService';
import {logo} from '../../components/Icon';
import Theme from '../../constant/Theme'
 
export default function ForgotPassword({navigation}) {
    
    const [userName, setUserName] = useState("");
    const [errUserName, setErrorUserName] = useState("");
    const [animating,setAnimating] = useState(false);
    
    const handleSubmitPress = () => {

        setErrorUserName("")
        setAnimating(true);

        if (userName) {

            Forgot({username:userName})
            .then(async res => {
                
                navigation.navigate('ForgotPasswordOTPScreen',{mobile_number:res.data.mobile_number})
            })
            .catch(err => {
                
                setErrorUserName(err.response.data.message)
            })

        }else{

            userName?setErrorUserName(''):setErrorUserName('Email / Mobile Number field is required')
            
        }

        setAnimating(false)
    }
 
    return (
        <View style={styles.container}>

            <SafeAreaView >
                <ScrollView >
            <View style={{alignItems: "center"}}>
            <Image
            source={logo}
            style={styles.logo}
            />
            <View style={[styles.inputView,errUserName?{marginBottom:60}:{}]}>
                <Input
                label="Your Account"
                placeholder="Email / Mobile Number"
                labelStyle={{fontSize:12}}
                style={styles.TextInput}
                errorMessage={errUserName}
                errorStyle={{color:'red'}}
                onChangeText={value => setUserName(value)}
                leftIcon={
                    <Icon
                    name='user'
                    size={16}
                    color={Theme.iconColor}
                    />
                }/>      
            </View>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.forgot_button}>Back to login?</Text>
        </TouchableOpacity>
        
 
        {animating?(
            
            <ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
            ):(
            <TouchableOpacity style={styles.loginBtn}  onPress={handleSubmitPress.bind(this)} >
                <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
        )}
        
        </View>
        </ScrollView>
        </SafeAreaView>
    </View>
  );
}
 