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
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { emailExists } from '../../services/RegisterService';
import Theme from '../../constant/Theme'

export default function Registration({navigation}){

	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	const [confirmPassword,setConfirmPassword] = useState('');
	const [animating,setAnimating] = useState(false);
	const [error,setError] = useState({
		email:'',
		password:''
	});
	const [state,setState] = useState({
    	icon: "eye-slash",
    	password: true
  	});
  	const showPassword = () => {
    	setState(prevState => ({
      		icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
      		password: !prevState.password
    	}));
  	}
  	const nextScreen = async () => {
		
		setAnimating(true);

		let errorMessage = {
			email:'',
			password:''
		};
		
  		if (email && password && (password.length >= 6 || password.length <= 16) && confirmPassword && password === confirmPassword) {
			
  			await emailExists({email})
  			.then(async res => {
					
				await AsyncStorage.setItem('email',email);
				await AsyncStorage.setItem('password',password);

				navigation.navigate('MobileNumber')
  			})
  			.catch(err => {
  				errorMessage.email = err.response.data.message;
				setError(errorMessage)
  			    //console.log(JSON.stringify(err.response.data))
  			})


  		}else{
			
			if (email == "") {
				errorMessage.email = 'Email is required field';
			}else{
				errorMessage.email = '';
			}
			if (password == "") {
				errorMessage.password = 'Password is required field';	
			}
			else if(password.length < 6 || password.length > 16){
				errorMessage.password = 'Password must be 6-16 characters';	
			}else{

				if (password != confirmPassword) {
					errorMessage.password = 'Confirm Password confirmation does not match';	
				}else{
					errorMessage.password = '';	
				}
			}
			
			setError(errorMessage)
  		}

  		setAnimating(false);

  	}
	
	return (
		<View style={styles.container}>
		<SafeAreaView style={{flex:1}}> 
		<ScrollView>
		 	<View style={[styles.heading,{
		 			alignItems:'center',
		 			height:70
		 		}]}>
		 		<Text style={styles.headingText}> Complete Profile </Text>
		 	</View>
		 	<View style={styles.subHeading}>
		 		<Text style={styles.subHeadingText}> Complete Your Profile </Text>

		 		<View style={[styles.inputView,error.email?{marginBottom:60}:{}]}>
				    <Input
				    label="Your Email"
				    placeholder="Enter Your Email"
				    labelStyle={{fontSize:12}}
				    errorMessage={error.email}
				    style={styles.TextInput}
				    onChangeText={value => setEmail(value)}
				    leftIcon={
				        <Icon
				          name='envelope'
				          size={16}
				          color='black'
				        />
				    }
				    />      
      			</View>
      		    <View style={[styles.inputView,error.password?{marginBottom:60}:{}]}>
			    	<Input
			    	label="Create Password"
			    	placeholder="Enter Your Password"
			    	style={styles.TextInput}
			    	errorMessage={error.password}
			    	onChangeText={value => setPassword(value)}
			    	labelStyle={{fontSize:12}}
			    	secureTextEntry={state.password}
			    	leftIcon={
			        	<Icon
			        	name='lock'
			        	size={16}
			        	color='black'
			        	/>
			    	}
			    	rightIcon={
			        	<Icon
			        	name={state.icon}
			        	size={16}
			        	color='black'
			        	onPress={() => showPassword()}
			        	/> 
			    	}

			    />
			    </View>
			    <View style={styles.inputView}>
			      <Input
			      label="Confirm Password"
			      placeholder="Enter Your Password"
			      style={styles.TextInput}
			      onChangeText={value => setConfirmPassword(value)}
			      labelStyle={{fontSize:12}}
			      secureTextEntry={state.password}
			      leftIcon={
			        <Icon
			          name='lock'
			          size={16}
			          color='black'
			        />
			      }
			      />
			         
			    </View>
			    {animating?(
            
            		<ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
            	):(
            	<TouchableOpacity style={styles.loginBtn}  onPress={nextScreen.bind(this)}>
                	<Text style={styles.loginText}>Continue</Text>
            	</TouchableOpacity>
        		)}
			    
			</View>
		 	<View style={styles.footer}>
		 		
		 	</View>
		 	</ScrollView>
		 	</SafeAreaView>
		</View>
	);
}