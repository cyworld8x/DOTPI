const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;

export default {
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
       
    },
    wrapper: {
        
        backgroundColor: '#FFF',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 0,
        paddingHorizontal: 0
    },
    backStyle: {
        width: 30,
        height: 30
    },
    listPostContainer: {
        backgroundColor: 'red',
        paddingHorizontal:30,
        backgroundColor:'black'
    },
    singlePostContainer: {
        width:deviceWidth,
        flex:1,
        flexDirection: 'column',
        borderTopColor: 'silver',
        borderTopWidth: 3,
        justifyContent:'space-between',
    },
    postContainer: {
        width:deviceWidth,
        paddingVertical: 10,
        paddingHorizontal:10,
        flex:1,
        flexDirection: 'column',
        borderBottomColor: 'silver',
        borderBottomWidth: 10,
        justifyContent:'space-between',
    },
    postContentTop: {
        backgroundColor: '#FFF',
        borderBottomColor: 'silver',
        borderBottomWidth: 2,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postContent: {
        
        backgroundColor: '#FFF',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postImage: {
        width: deviceWidth/4,
        height: deviceWidth/4,
        resizeMode:'cover',
        borderRadius:5,
        

    },
   
    image: {
        width: deviceWidth/4,
        height: deviceHeight/10,

    },
    postContainerCol: {
        width: deviceWidth,

        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'silver',
        borderBottomWidth: 10,
        justifyContent: 'space-between',
    },
    postContentCol: {
        width: deviceWidth / 2,
        padding: 10,
        backgroundColor: '#FFF',

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    postImageCol: {

        width: deviceWidth / 2 - 20,
        height: deviceWidth / 3,
        resizeMode: 'cover',
    },
    imageCol: {
        width: deviceWidth / 2,
        height: deviceWidth / 2,

    },
    postInfoCol: {
        paddingTop:5,
        justifyContent: 'space-between',
        flex: 1
    },

    postContainerFullRow: {
        width: deviceWidth,

        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'silver',
        borderBottomWidth: 10,
        justifyContent: 'space-between',
    },
    postContentFullRow: {
        width: deviceWidth,
        padding: 10,
        backgroundColor: '#FFF',

        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    postImageFullRow: {
        borderRadius:5,
        width: deviceWidth,
        height: deviceWidth/2,
        resizeMode: 'cover',
    },
    imageFullRow: {
        width: deviceWidth ,
        height: deviceWidth *2/ 3,

    },
    postInfoFullRow: {
        paddingTop:5,
        justifyContent: 'space-between',
        height:75,
        flex: 1
    },
    titleStyle: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 20
    },
    
   
    
    postInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    savedPostInfo: {
        justifyContent: 'space-between',        
        flex: 1
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: '400'
    },
    txtPrice: {
        fontFamily: 'Avenir',
        color: '#B10D65',
    },
    txtMaterial: {
        fontFamily: 'Avenir'
    },
    txtColor: {
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
      fontFamily: 'Avenir',
      color: '#B10D65',
      fontSize: 11
    },
    text: {
      alignSelf: "center",
      marginBottom: 7
    },
    mb: {
      marginBottom: 15
    },
};


