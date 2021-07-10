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
  ActivityIndicator,
  Alert
} from "react-native";
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { loginApi, userInfo } from '../../services/LoginService';
import {logo} from '../../components/Icon';
import Theme from '../../constant/Theme'
import { useIsConnected } from 'react-native-offline';
 
export default function Login({navigation}) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errEmail, setErrorEmail] = useState("");
    const [errPassword, setErrorPassword] = useState("");
    const [animating,setAnimating] = useState(false);
    const [state,setState] = useState({
        icon: "eye-slash",
        password: true
    });
    const isConnected = useIsConnected();
    const showPassword = () => {
        setState(prevState => ({
            icon:prevState.icon === 'eye' ? 'eye-slash' : 'eye',
            password: !prevState.password
        }));
    }
    const clearAndDismissKeyboard = () => {

        Keyboard.dismiss();
        setEmail("");
        setPassword("");
        setErrorEmail("");
        setErrorPassword("");
    }
    const clearError = () => {

        setErrorEmail("");
        setErrorPassword("");
    }
    const handleSubmitPress = async () => {

        setAnimating(true);

        if (isConnected) {

            if (email && password) {

                await loginApi({email,password})
                .then(async res => {
                    clearAndDismissKeyboard()

                    
                    await AsyncStorage.setItem('token', res.data.token);

                    let headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${res.data.token}`
                    }
                    
                    await userInfo(headers).then(async res => {

                        await AsyncStorage.setItem('user_info', JSON.stringify(res.data[0]));

                        navigation.replace('DrawerNavigationRoutes');
                        
                    }).catch(err => {
                        
                        setErrorEmail('somthing went wrong')

                    })


                    
                })
                .catch(err => {
                    clearError()
                    setErrorEmail(err.response.data[0].message)
                })

            }else{

                email?setErrorEmail(''):setErrorEmail('Email / Mobile Number field is required')
                password?setErrorPassword(''):setErrorPassword('Password field is required')
                
            }
        }else{
            Alert.alert('You are offline')
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
            <View style={[styles.inputView,errEmail?{marginBottom:60}:{}]}>
                <Input
                label="Your Account"
                placeholder="Email / Mobile Number"
                labelStyle={{fontSize:12}}
                style={styles.TextInput}
                errorMessage={errEmail}
                errorStyle={{color:'red'}}
                onChangeText={value => setEmail(value)}
                leftIcon={
                    <Icon
                    name='user'
                    size={16}
                    color={Theme.iconColor}
                    />
                }/>      
            </View>
            <View style={styles.inputView}>
            <Input
            label="Password"
            placeholder="Enter Your Password"
            style={styles.TextInput}
            secureTextEntry={state.password}
            errorMessage={errPassword}
            errorStyle={{color:'red'}}
            labelStyle={{fontSize:12}}
            onChangeText={value => setPassword(value)}
            leftIcon={
                <Icon
                name='lock'
                size={16}
                color={Theme.iconColor}
                />}
            rightIcon={
                <Icon
                name={state.icon}
                size={16}
                color={Theme.iconColor}
                onPress={() => showPassword()}/>}
            />
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>

            <Text style={styles.signUpButton} >Don't Have an Account?   
                <Text style={{color: Theme.linkColor}} > Sign Up</Text>
            </Text>
        </TouchableOpacity>
 
        {animating?(
            
            <ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
            ):(
            <TouchableOpacity style={styles.loginBtn}  onPress={handleSubmitPress}>
                <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
        )}
        
        </View>
        </ScrollView>
        </SafeAreaView>
    </View>
  );
}
 