import Theme from '../../constant/Theme'

export default {
  	container: {
    	flex: 1,
  	},
  	headerSection:{
  		height: 350, 
  		backgroundColor: Theme.themeColor2 
  	},
  	header: {
    	flex:1,
    	width: '100%',
    	left: 15,
    	top: 20,
    	flexDirection: "row",
    	flexWrap: 'wrap',
    	position:'absolute',
    	alignItems: 'flex-start',
    	marginBottom:20,
  	},
    subHeader: {
        width: '50%',
        alignItems: 'flex-start',
        flexDirection: "row"
    },
    item: {
        width: '33%',
    	paddingTop: 10,
    	alignItems: "center",
    	marginBottom:20,
    },
    iconText:{
    	color: Theme.iconColor,
    	fontSize:12
    },
  	imageIcon:{
    	width:50,
    	height:50,
    	marginBottom:10
  	},
    profileImage:{
        width:35,
        height:35,
        marginRight:15
    },
    greeting: {
        color:'grey',
        fontSize:10
    },
    userText:{
        color:'#ffff',
        fontSize:13,
        marginTop:2
    },
    logout:{
        width: '50%',
        flexDirection: "row-reverse", 
        flexWrap: "wrap"
    },
    iconStyle:{ 
        marginTop:10,
        marginLeft:10,
        marginRight:25
    },
    walletArea:{ 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:50,
        flex:2
    },
    walletAmount:{
        fontSize:35,
        color:Theme.text2Color
    },
    transactionAreaContainer:{
        height:100,
        backgroundColor: Theme.themeColor2 
    },
    transactionSection:{
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: "row"
    },
    transactionIconStyle:{
        width:20,
        height:25,
        marginLeft:20,
        marginTop:5,
        marginRight:5
    },
    transactionText:{
        color:'grey',
        fontSize:10
    },
    transactionText2:{
        color: Theme.text2Color,
        fontSize:13,
        marginTop:2
    },
    outcomeIcon: {
        width:20,
        height:25,
        marginLeft:20,
        marginTop:5,
        marginRight:5
    },
    outcomeText: {
        color:'grey',
        fontSize:10
    },
    outcomeValue: {
        color: Theme.text2Color,
        fontSize:13,
        marginTop:2
    },
    transactionAreaText: {
        color: Theme.text2Color,
        fontSize:13,
        lineHeight:35,
        left:10
    },
    footer: { 
        height:235, 
        backgroundColor: Theme.themeColor2
    },
    footerCard: { 
        flex: 1, 
        backgroundColor: "#ffff",
        marginTop:-30,
        flexDirection: "row",
        flexWrap: 'wrap',
        position:'absolute',
        zIndex:1,
        alignItems: 'flex-start',
        marginLeft:15,
        marginRight:15,
        marginBottom:15,
        borderRadius:10,
        paddingBottom:20,
        padding:10
    }


};
