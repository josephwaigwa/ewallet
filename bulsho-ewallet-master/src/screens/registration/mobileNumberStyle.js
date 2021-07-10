import Theme from '../../constant/Theme'

export default {
	container: {
	    flex: 1,
	    backgroundColor: Theme.themeColor2,
	    alignItems: "center",
        paddingTop:80
	},
  	inputView: {
    	width: "80%",
    	height: 45,
    	marginBottom: 50,
  	},
  	TextInput: {
    	height: 50,
    	flex: 1,
    	color: Theme.textColor,
  	},
  	headingText: {
  		color: Theme.text2Color,
  		fontSize:20,
  		width: '80%',
  		paddingTop: 40
  	},
  	subHeading: {
  		flex: 4,
  		backgroundColor: Theme.themeColor,
  		borderRadius:10,
  		alignItems:'center',
  		width:"90%"
  	},
  	subHeadingText: {
		 color: Theme.linkColor,
		 textAlign:'left',
		 alignSelf: 'stretch',
		 marginTop: 30,
		 marginLeft: 30,
		 fontSize: 18,
		 marginBottom:30
	},
	footer: {
		flex: 1,
		backgroundColor: Theme.themeColor2
	},
	loginText:{
    	color: Theme.text2Color,
    	fontWeight: 'bold'
  	},
  	loginBtn: {
    	width: "80%",
    	borderRadius: 5,
    	height: 50,
    	alignItems: "center",
    	justifyContent: "center",
    	marginTop: 40,
    	backgroundColor: Theme.buttonColor,
  	},
}