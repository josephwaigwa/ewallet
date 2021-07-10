import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../components/Icon';
import Theme from '../constant/Theme'

const SplashScreen = ({navigation}) => {
  
  const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
      
            AsyncStorage.getItem('token').then((value) =>
                navigation.replace(
                    value === null ? 'Auth' : 'DrawerNavigationRoutes'
                ),
            );
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
        <Image
            source={Icon.logo}
            style={{width: '90%', resizeMode: 'contain', margin: 30}}
        />
        <ActivityIndicator
            animating={animating}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
        />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.themeColor,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  logo: {
    fontSize:40,
    fontWeight:'bold',
    color:'#ffff',
    marginBottom: 70
  }
});