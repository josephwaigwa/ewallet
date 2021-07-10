import React, { useState,useEffect } from "react";
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
import { transferAPI } from '../../services/TransferService';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Theme from '../../constant/Theme'
const errInit = {
	mobile_numberError:'',
	amountError:''
};

export default function TransferScreen({navigation,route}){

	const [state,setState] = useState({
		mobile_number:'',
		amount:''
	});
    
	const [errState,setErrState] = useState(errInit);
	const [userInfo,setUserInfo] = useState({});
	const [spining,setSpining] = useState(true);
	const [animating,setAnimating] = useState(false);

	useEffect(async () => {

		await setUserInfo(JSON.parse(await AsyncStorage.getItem('user_info')));
		if (route && route.params && route.params.mobile_number) {
			setState({...state,mobile_number:route.params.mobile_number})
		}
		await setSpining(false);
	},[]);
	const clear = () => {
		setErrState(errInit)
	}

	const transferProceed = async () => {

		setAnimating(true);
		const token = await AsyncStorage.getItem('token');

		if (userInfo.mobile_number == state.mobile_number) {
			setErrState({ mobile_numberError: "You can't use same mobile number"})
		}else{

	        let headers = {
	            'Content-Type': 'application/json',
	            'Authorization': `Bearer ${token}`
	        }
	        await transferAPI(state,headers)
	        .then(async res => {
	        	setErrState(errInit)
	        	setState({mobile_number:'',amount:''})

	        	await AsyncStorage.setItem('user_info', JSON.stringify(res.data.data[0]));

	        	Alert.alert(
	      			"Success",
	      			"Fund Transferred",[{
		          		text: "Back to home",
		          		onPress: () => navigation.navigate('HomeScreen')
	        		},
	        		{
	          			text: "Cancel",
	          			onPress: () => setState({mobile_number:'',amount:''}),
	          			style: "cancel"
	        		},
	        		]
	    		);
	        	
	        }).catch(async err => {


	        	if (err.response.data.length && err.response.data.length == 2) {


	        		setErrState({
	        			mobile_numberError: err.response.data[0].message,
						amountError:  err.response.data[1].message
					})
						

	        	}else if(err.response.data.length){

	        		if (err.response.data[0].field == 'mobile_number') {
	        			setErrState({mobile_numberError: err.response.data[0].message})	
	        		}else{
	        			setErrState({amountError: err.response.data[0].message})	
	        		}
	        	}
	        	
	        })
		}
        setAnimating(false);
	}
  	
	
	return (
		<View style={styles.container}>
		{spining ? (
			<Spinner
                visible={spining}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
            />
		):(
			<SafeAreaView style={{flex:1}}> 
			<ScrollView>
			 	<View style={[styles.heading,{
			 			alignItems:'center'
			 		}]}>
			 		
			 	</View>
			 	<View style={styles.subHeading}>
			 		

			 		<View style={styles.inputView}>
					   <Input
					    label="Enter Phone Number"
					    labelStyle={{fontSize:12}}
					    placeholder="Enter Phone Number"
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
					    label="Amount"
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
	            	
				    userInfo.is_vendor?(
				    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
					    <TouchableOpacity style={[styles.loginBtn,{marginRight:10,width:'30%'}]} onPress={() => transferProceed()}>
		        			<Text style={styles.loginText} >Send</Text>
		      			</TouchableOpacity>
		      			<TouchableOpacity style={[styles.loginBtn,{width:'30%'}]} onPress={() => navigation.navigate('TransferToAdminScreen')}>
		        			<Text style={styles.loginText} >Send to admin</Text>
		      			</TouchableOpacity>
				    	
				    </View>
				    ):(
				    	<TouchableOpacity style={styles.loginBtn} onPress={() => transferProceed()}>
		        			<Text style={styles.loginText} >Send</Text>
		      			</TouchableOpacity>
				    )
	        		)}

				</View>
			 	<View style={styles.footer}>
			 		
			 	</View>
			 	</ScrollView>
			 	</SafeAreaView>
		)}
		</View>
	);
}