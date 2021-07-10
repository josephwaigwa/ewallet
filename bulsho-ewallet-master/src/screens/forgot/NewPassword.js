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
import { Reset } from '../../services/ForgotPasswordService';
import {logo} from '../../components/Icon';
import Theme from '../../constant/Theme'
 
export default function NewPassword({navigation,route}) {
    
    const { user_id } = route.params;
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [errPassword, setErrorPassword] = useState("");
    const [animating,setAnimating] = useState(false);
    const [state,setState] = useState({
        icon: "eye-slash",
        password: true
    });
    const showPassword = () => {
        setState(prevState => ({
            icon:prevState.icon === 'eye' ? 'eye-slash' : 'eye',
            password: !prevState.password
        }));
    }
    const clearAndDismissKeyboard = () => {

        Keyboard.dismiss();
        setConfirmPassword("");
        setPassword("");
        setErrorPassword("");
    }
    const clearError = () => {

        setConfirmPassword("");
        setErrorPassword("");
    }
    const handleSubmitPress = () => {

        setAnimating(true);

        if (password && confirmPassword && password === confirmPassword) {

            console.log({user_id,password});
            Reset({user_id,password})
            .then(async res => {
               clearAndDismissKeyboard()
                
                Alert.alert(
                "Success",
                "Password Reset",[{
                    text: "OK",
                    onPress: () => navigation.navigate('LoginScreen')
                }]
            );
                
            })
            .catch(err => {
                //clearError()
                setErrorPassword(err.response.data.message)
            })

        }else{

            if (password && confirmPassword) {
                //console.log('password and confirm password not match message')
                setErrorPassword('password and confirm password not match')
            }else{
                password?setErrorPassword(''):setErrorPassword('Password field is required')          
            }
            
            
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
            <View style={styles.inputView}>
                <Input
                label="Password"
                placeholder="New Password"
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
            <View style={styles.inputView}>
                <Input
                label="Confirm Password"
                placeholder="Confirm Password"
                style={styles.TextInput}
                secureTextEntry={state.password}
                errorStyle={{color:'red'}}
                labelStyle={{fontSize:12}}
                onChangeText={value => setConfirmPassword(value)}
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
 
        {animating?(
            
            <ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
            ):(
            <TouchableOpacity style={styles.loginBtn}  onPress={handleSubmitPress}>
                <Text style={styles.loginText}>Reset</Text>
            </TouchableOpacity>
        )}
        
        </View>
        </ScrollView>
        </SafeAreaView>
    </View>
  );
}
 