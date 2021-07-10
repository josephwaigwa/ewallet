import React ,{useState}from 'react';
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
  ActivityIndicator,
  Alert
} from "react-native";
import styles from './OTPStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,CheckBox } from 'react-native-elements';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import Theme from '../../constant/Theme'
import AsyncStorage from '@react-native-community/async-storage';
import { registerApi, userInfo } from '../../services/LoginService';

export default function SignUpSubmit ({navigation}){

	const [isChecked,setIsChecked] = useState(false);
	const [animating,setAnimating] = useState(false);
	const register = async () => {

		await getDataFromAPI();
		navigation.replace('DrawerNavigationRoutes');

	}
	const getDataFromAPI = async () => {
		setAnimating(true);
        
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        const mobileNumber = await AsyncStorage.getItem('mobileNumber');
		
		console.log({
			email:email,
			password:password,
			mobile_number: mobileNumber,
			is_vendor: isChecked ? 1 : 0
		});
		await registerApi({
			email:email,
			password:password,
			mobile_number: mobileNumber,
			is_vendor: isChecked ? 1 : 0
		}).then(async res => {

			if (isChecked) {
				
				Alert.alert(
	                "Success",
	                "Registration successfull waiting for admin approval",[{
	                    text: "OK",
	                    onPress: () => navigation.navigate('LoginScreen')
	                }]
            	);

			}else{

				await AsyncStorage.setItem('token', res.data.token);
	        	let headers = {
	            	'Content-Type': 'application/json',
	            	'Authorization': `Bearer ${res.data.token}`
	        	}
	        	
	        	await userInfo(headers).then(async res => {

	            	await AsyncStorage.setItem('user_info', JSON.stringify(res.data[0]));
	            	navigation.replace('DrawerNavigationRoutes');
	                	
	        	}).catch(err => {
	            	
	        	})

			}
		}).catch(err => {
            	console.log(JSON.stringify(err.message) )
        })
		
		setAnimating(false);
    }

	return(
		<View style={{flex: 1,backgroundColor: Theme.themeColor2,alignItems: "center",paddingTop:80}}>
            
			
		 	<View style={{flex: 6,backgroundColor:'#ffffff',borderRadius:10,width:"90%",alignItems: "center"}}>

		 		<View elevation={20} style={{  
		 			width: 100,
		 			height: 100,
		 			backgroundColor: Theme.themeColor2,
		 			alignItems:'center',
		 			marginTop:80,
		 			marginBottom:50,
		 			borderRadius:10,
		 		}}>
		 			<Icon name='check' size={90} color='#ffff' light />
		 		</View>
		 		<View style={{width:'80%',marginBottom:10}}>
		 			<Text style={{ fontSize:16,fontWeight:'bold'}}>By Tapping the Finish below, you agree to our Term & Condition</Text>
		 		</View>

		 		{/*<TouchableOpacity style={{width:'80%',marginBottom:20}}>
      					<CheckBox
      					center
      					containerStyle={{backgroundColor:'white',borderRadius:0}}
						title='Register as Bulsho Agent'
						onPress={() => setIsChecked(!isChecked)}
						checked={isChecked}
        				/>
      				<Text style={{color:'#232a34'}}> 
        			</Text>
      			</TouchableOpacity>*/}
		 		

		 		
      			<TouchableOpacity>
      				<Text style={{color:'#232a34'}}> To learn more, see our
				        <Text style={styles.signUpButton} onPress={() => navigation.goBack()}> Term & Condition   
	        			</Text>
        			</Text>
      			</TouchableOpacity>

				{animating?(
            
            		<ActivityIndicator  color={Theme.text2Color} style={styles.loginBtn}/>
            
            	):(
            	<TouchableOpacity style={styles.loginBtn}  onPress={getDataFromAPI.bind(this)}>
                	<Text style={styles.loginText}>Finish</Text>
            	</TouchableOpacity>
        		)}
		 	</View>
		 	<View style={styles.footer}>
		 		
		 	</View>
		</View>
	);
}