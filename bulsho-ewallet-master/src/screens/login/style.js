import Theme from '../../constant/Theme'

export default {
  container: {
    flex: 1,
    backgroundColor: Theme.themeColor,
   // alignItems: "center",
    //justifyContent: "center",
  },
 
  image: {
    marginBottom: 50,
  },
 
  inputView: {
    //backgroundColor: "#FFC0CB",
   // borderRadius: 30,
   //justifyContent: "center",
    width: "80%",
    height: 40,
    marginBottom: 50,
    //left: 35,
 
    //alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 5,
    color: Theme.textColor,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: Theme.linkColor
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: Theme.buttonColor,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  loginText:{
    color: '#ffff',
    fontWeight: 'bold'
  },
  signUpButton:{
    height: 20,
    fontWeight:'bold',
   // marginBottom: 30,
    color: Theme.textColor
  },
  /*logo: {
    fontSize:40,
    fontWeight:'bold',
    color:'#ffff',
    marginBottom: 70
  }
*/
logo: {
    width: '90%', 
    height: 300,
    resizeMode: 'contain', 
    //marginBottom: 70
  }
};
