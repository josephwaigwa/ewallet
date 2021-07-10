import React , {useState,useEffect} from 'react';
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
import styles from '../registration/OTPStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import { OtpVerify } from '../../services/ForgotPasswordService';
import AsyncStorage from '@react-native-community/async-storage';
import Theme from '../../constant/Theme';

export default function OTP ({navigation,route}){

	const { mobile_number } = route.params;

	const [otp,setOtp] = useState({a:'',b:'',c:'',d:''});
	const input_1 = React.createRef();
	const input_2 = React.createRef();
	const input_3 = React.createRef();
	const input_4 = React.createRef();
	const [animating,setAnimating] = useState(false);
	const [mobileNumber,setMobileNumber] = useState(0);
	
	useEffect(async () => {
		const number = await AsyncStorage.getItem('mobileNumber');
		setMobileNumber(number);
	},[mobileNumber])

	const otpField = (value,index) => {

		switch (index) {
			case 1:
				value?input_2.current.focus():''
				setOtp({...otp,a:value})
				break;
			case 2:
				value?input_3.current.focus():''
				setOtp({...otp,b:value})
				break;
			case 3:
				value?input_4.current.focus():''
				setOtp({...otp,c:value})
				break;
			case 4:
				setOtp({...otp,d:value})
				break;
		}
		
	}
	const nextScreen = async () => {
			
		setAnimating(true);

		const otpcombine = otp.a+otp.b+otp.c+otp.d;

		if (otpcombine.length == 4) {

			await OtpVerify({otp:otpcombine})
			.then(res => {

				navigation.navigate('ForgotPasswordNewPasswordScreen',{
					user_id: res.data.data.user_id
				})

			}).catch(err => {
		
				Alert.alert(
          			"Error",
           			"OTP invalid",[
           			{
               			text: "OK",
               			style: "cancel"
           			}]
        		);
			})
				
		}else{

			Alert.alert(
            	"Error",
            	"OTP invalid",[
            	{
               		text: "OK",
               		style: "cancel"
            	}]
        	);
		}
		setAnimating(false);
	}

	const otpResend = () => {
		
		resendOTP({mobile_number:mobileNumber})
		.then(res => {

			Alert.alert(
            	"Success",
            	`OTP sent on ${mobileNumber}`,[
            	{
               		text: "OK",
               		style: "cancel"
            	}]
        	);
		}).catch(err => {

			Alert.alert(
            	"Error",
            	"Somthing went wrong",[
            	{
               		text: "OK",
               		style: "cancel"
            	}]
        	);
		})
	}
	return(
		<View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={{alignItems: 'center' }}>
			
		 	<View style={styles.subHeading}>
		 		<Text style={styles.subHeadingText}> Enter the 4-digit code sent to you at </Text>
		 		<Text style={styles.numberShow}>{mobile_number}</Text>
	      		<View
	            style={{
	            	flexDirection: 'row',
	            	width: '90%',
	            	justifyContent: 'center',
	            }}>
	            	<View style={{width: '20%'}}>
			            <Input
			            	
			            	ref={input_1}
			                keyboardType={'number-pad'}
			                textAlign={'center'}
			                maxLength={1}
			                onChangeText={value => otpField(value,1)}
			                autoFocus={true}
			            />
	            	</View>
	            	<View style={{width: '20%'}}>
			            <Input
			            	ref={input_2}
			                keyboardType={'number-pad'}
			                textAlign={'center'}
			                maxLength={1}
			                onChangeText={value => otpField(value,2)}
			                autoFocus={false}
			            />
	            	</View>
		            <View style={{width: '20%'}}>
			            <Input
			            	ref={input_3}
			                keyboardType={'number-pad'}
			                textAlign={'center'}
			                maxLength={1}
			                onChangeText={value => otpField(value,3)}
			                autoFocus={false}
			            />
		            </View>
		            <View style={{width: '20%'}}>
			            <Input
			            	ref={input_4}
			                keyboardType={'number-pad'}
			                textAlign={'center'}
			                maxLength={1}
			                onChangeText={value => otpField(value,4)}
			                autoFocus={false}
			            />
		            </View>
	          	</View>
      			<TouchableOpacity onPress={otpResend.bind(this)}>
        			<Text style={styles.forgot_button}>Resend Code</Text>
      			</TouchableOpacity>
      			
				
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
		</View>
	);
}