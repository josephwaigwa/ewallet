import React, { useEffect,useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator
} from "react-native";
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { emailExists } from '../../services/RegisterService';
import * as ProfileService from '../../services/ProfileService';
import Theme from '../../constant/Theme'
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';
import CIcon from '../../components/Icon';

export default function ProfileScreen({navigation}){

	const [animating,setAnimating] = useState(false);
	const [error,setError] = useState({
		email:'',
		name:''
	});
	const [userData,setUserData] = useState({name:'',email:''});
	const [spining,setSpining] = useState(true);
	const [profile,setProfile] = useState("");
	
  	useEffect(async () => {

		await setUserData(JSON.parse(await AsyncStorage.getItem('user_info')));
		 setSpining(false);

  	},[])
  	
  	const nextScreen = async () => {
		
		setAnimating(true);

		let errorMessage = {
			email:'',
			name:''
		};
		
  		if (userData.name && userData.email ) {
			
			const token = await AsyncStorage.getItem('token');

			var formData = new FormData();
				formData.append("name", userData.name);
				formData.append("email", userData.email);
				if (profile) {
					formData.append("profile", {
	    				name: profile.fileName,
	    				type: profile.type,
	    				uri: Platform.OS === "android" ? profile.uri : profile.uri.replace("file://", "")
	  				});
				}else{
					formData.append("profile",profile);
				}

        	let headers = {
            	'Content-Type': 'application/json',
            	'Authorization': `Bearer ${token}`,
            	//'Content-Type': 'multipart/form-data'
        	}
        	
  			await ProfileService.emailExists({email:userData.email},headers)
  			.then(async res => {
				
				await ProfileService.update(formData,headers).then(async res => {
					
					await AsyncStorage.setItem('user_info',JSON.stringify(userData))

					Alert.alert(
                    	"Success",
                    	'Profile Updated',[
                    	{
                        	text: "OK",
                        	style: "cancel"
                    	}]
                	);
				}).catch(err =>{

					Alert.alert(
                    	"Error",
                    	err.response.data.message,[
                    	{
                        	text: "OK",
                        	style: "cancel"
                    	}]
                	);
				})

  			})
  			.catch(err => {

  				console.error(err)
  				errorMessage.email = err.response.data.message;
				setError(errorMessage)
  			})


  		}else{
			
			if (userData.email == "") {
				errorMessage.email = 'Email is required field';
			}else{
				errorMessage.email = '';
			}
			if (userData.name == "") {
				errorMessage.name = 'Name is required field';	
			}else{

				errorMessage.name = '';	
			}
			
			setError(errorMessage)
  		}

  		setAnimating(false);

  	}
  	const handleChoosePhoto = () => {
    	const options = {
      		noData: true,
    	};
    	ImagePicker.launchImageLibrary(options, (response) => {
      		if (response.uri) {
      			setProfile(response);
      			setUserData({...userData,avatar:response.uri});
      		}
    	});
  	};
	
	return (
		<View style={styles.container}>
		
		{spining?(
            <Spinner
                visible={spining}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
            />
            ):(
            <SafeAreaView style={{flex:1}}> 
				<ScrollView>
			 	<View style={[styles.heading,{
			 			alignItems:'center',
			 			height:10
			 		}]}>
			 	</View>
			 	<View style={styles.subHeading}>
			 		<Text style={styles.subHeadingText}> Update Your Profile </Text>
			 		<TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={handleChoosePhoto}>
				       
					    <ImageBackground 
	                        source={userData.avatar?{ uri: userData.avatar } : CIcon.profile}
	                        style={style.profileImage} 
	                        imageStyle={{ borderRadius: 40}}/>
				        
				        <Text style={{marginBottom: 10}}>Choose Photo</Text>
				        
				    </TouchableOpacity>
					<View style={[styles.inputView,error.name?{marginBottom:60}:{}]}>
					    <Input
					    label="Your Name"
					    placeholder="Enter Your Name"
					    labelStyle={{fontSize:12}}
					    errorMessage={error.name}
					    style={styles.TextInput}
					    onChangeText={value => setUserData({...userData,name: value})}
					    value={userData.name}
					    leftIcon={
					        <Icon
					          name='user'
					          size={16}
					          color='black'
					        />
					    }
					    />      
	      			</View>

			 		<View style={[styles.inputView,error.email?{marginBottom:60}:{}]}>
					    <Input
					    label="Your Email"
					    placeholder="Enter Your Email"
					    labelStyle={{fontSize:12}}
					    errorMessage={error.email}
					    style={styles.TextInput}
					    value={userData.email}
					    onChangeText={value => setUserData({...userData,email: value})}
					    leftIcon={
					        <Icon
					          name='envelope'
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
	                	<Text style={styles.loginText}>Update</Text>
	            	</TouchableOpacity>
	        		)}
				    
				</View>
			 	<View style={styles.footer}>
			 		
			 	</View>
			 	</ScrollView>
		 	</SafeAreaView>
            )
        }
		
		</View>
	);
}

const style = StyleSheet.create({  
    container: {  
        flex: 1, 
        backgroundColor: Theme.themeColor2
    },  
    item: {  
        padding: 10,
        fontSize: 18,  
    },  
    profileImage:{
        width:80,
        height:80,
        marginBottom: 10
        //marginRight:15
    },
    main:{
        height:80,
        //marginVertical: 5,
        //marginHorizontal:8,
        //borderRadius:15,
        backgroundColor:Theme.themeColor,
    },
    section:{
        flex: 1,
        flexDirection:'row',
        marginBottom:35,
        marginTop:15
    },
    firstPart:{
        flex:1 ,
        flexDirection:'row',
        marginLeft:15
    }
})  