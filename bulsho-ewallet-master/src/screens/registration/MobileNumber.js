import React,  {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import styles from './mobileNumberStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { mobileNumberExists,sendOTP } from '../../services/RegisterService';
import Theme from '../../constant/Theme'

export default function MobileNumber ({navigation}){

	const [mobileNumber, setMobileNumber] = useState('');
	const [error,setError] = useState('');
	const [animating,setAnimating] = useState(false);

	const nextScreen = async () => {
		setAnimating(true);
		setError('');

		if (mobileNumber && mobileNumber.length == 10) {
			
			await mobileNumberExists({mobile_number:mobileNumber}).then(async res => {
				
				await sendOTP({mobile_number:mobileNumber}).then(async res => {
					
					await AsyncStorage.setItem('mobileNumber',mobileNumber);

					navigation.navigate('OTP');

				}).catch(err => {
					console.log(JSON.stringify(err.response.data))
					setError('something went wrong!');
				})
				

			}).catch(err => {
				
				console.log(JSON.stringify(err.response.data))
				setError(err.response.data.message);

			})
			
		}else{

			if (mobileNumber) {
				setError('Phone number must be contain 10 digits');
			}else{
				setError('Phone Number is required field');	
			}
			
		}
		setAnimating(false);
	}
	return(
		<View style={styles.container}>
			
		 	<View style={styles.subHeading}>
		 		<Text style={styles.subHeadingText}> Enter Your Phone Number </Text>
		 		<View style={styles.inputView}>
				    <Input
				    label="Your Phone Number"
				    labelStyle={{fontSize:12}}
				    placeholder="Enter Phone Number"
				    errorMessage={error}
				    style={styles.TextInput}
				    onChangeText={value => setMobileNumber(value)}
				    keyboardType = "number-pad"
				    maxLength = {10}
				    leftIcon={
				        <Icon
				          name='phone'
				          size={16}
				          color='black'
				        />
				    }
				    />      
      			</View>
      			<Text style={{color:'#5a6777',fontSize:12}}> By continue you may recieve as SMS for verification. </Text>
      			<Text style={{color:'#5a6777',fontSize:12}}> Message and data rates may apply. </Text>
				
				{animating?(
            
            		<ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
            	):(
            	<TouchableOpacity style={styles.loginBtn}  onPress={nextScreen.bind(this)} >
                	<Text style={styles.loginText}>Continue</Text>
            	</TouchableOpacity>
        		)}

		 	</View>
		 	<View style={styles.footer}>
		 		
		 	</View>
		</View>
	);
}