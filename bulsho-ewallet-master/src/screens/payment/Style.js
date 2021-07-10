import Theme from '../../constant/Theme'
export default {
    
    container: {
        flex: 1,
        backgroundColor: Theme.themeColor2,
        //alignItems: "center",
    },
    inputView: {
        width: "80%",
        height: 45,
      top:20,
        marginBottom: 50,
    },
    TextInput: {
        height: 50,
        flex: 1,
        color: 'black',
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
      marginBottom: 40,
        backgroundColor: Theme.buttonColor,
    },
    heading: {
        flex: 1,
        marginTop:50
    },
    headingText: {
        color:Theme.text2Color,
        fontSize:20
    },
    subHeading: {
        //flex: 6,
        backgroundColor:Theme.text2Color,
        borderRadius:10,
        alignItems:'center',
        margin:10,
        marginTop:50

        //width:"90%"
    },
    subHeadingText: {
         color:'#4ba9fd',
         textAlign:'left',
         alignSelf: 'stretch',
         marginTop: 30,
         marginLeft: 30,
         fontSize: 18,
         marginBottom:30
    },
    footer: {
        flex: 0.5,
        backgroundColor:Theme.themeColor2
    }
}