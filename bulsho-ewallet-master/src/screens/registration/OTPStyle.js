import Theme from '../../constant/Theme'

export default {
	subHeadingText: {
		color: Theme.linkColor,
		textAlign:'left',
		alignSelf: 'stretch',
		marginTop: 30,
		marginLeft: 30,
		fontSize: 16,
		marginBottom:10
	},
	numberShow: {
		color:'black',
		textAlign:'left',
		alignSelf: 'stretch',
		//marginTop: 30,
		marginLeft: 35,
		fontSize: 16,
		marginBottom:30
	},
	forgot_button: {
	    height: 30,
	    fontWeight: 'bold',
	    //marginTop: 10,
	    color: Theme.linkColor
  	},
  	signUpButton:{
	    height: 20,
	    fontWeight:'bold',
	    color: Theme.linkColor
  	},
  	heading: {
  		//flex: 1,
  		height:100,
  		flexDirection:'row',
  		marginBottom:20,

  	},
  	container: {
	    flex: 1,
	    backgroundColor: Theme.themeColor2,
	    paddingTop:100
	},
  	inputView: {
    	width: "80%",
    	height: 45,
    	marginBottom: 50,
  	},
  	TextInput: {
    	height: 50,
    	flex: 1,
    	color: 'black',
  	},
  	
  	subHeading: {
  		//flex: 5,
  		height: 400,
  		backgroundColor: Theme.text2Color,
  		borderRadius:10,
  		alignItems:'center',
  		width:"90%"
  	},

	footer: {
		flex: 1,
		backgroundColor:'#121f41'
	},
	loginText:{
    	color: '#ffff',
    	fontWeight: 'bold'
  	},
  	loginBtn: {
    	width: "80%",
    	borderRadius: 5,
    	height: 50,
    	alignItems: "center",
    	justifyContent: "center",
    	marginTop: 10,
    	backgroundColor: Theme.buttonColor,
  	},


}