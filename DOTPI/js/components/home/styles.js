const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;

export default {
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },
    videocontainer: {
        flex: 1,
        backgroundColor: '#34B089' 
    },
    video_item: {        
        borderRadius:5,
        
        width: deviceWidth-20,
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: 'silver',
        borderBottomWidth: 10,
        justifyContent: 'space-between',
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
       
    },
    share: {
       height:deviceHeight/3,
       justifyContent: 'space-between',
       flexDirection: 'row',
       backgroundColor: '#42cb5c',
        //position:'absolute'
    },
    shareContainer: {   
       height:160,       
       flexDirection: 'row',
       backgroundColor: '#42cb5c',
        //position:'absolute'
    },
    shareContainer_Content: {    
        paddingHorizontal:20, paddingVertical:10,    
        flex:1,
        flexDirection:'column', justifyContent: 'space-between',
    },
    shareContainer_Row: {
        paddingVertical:10,
        backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between'
    },
    shareContainer_Row_Text: {
         color: "#FFF", paddingHorizontal: 10, alignSelf:'center'
    },
    shareContainer_Row_Icon: {
         color: "#FFF", width:30, alignSelf:'center'
    },
    
    shareContainer_Row_Content: {
        backgroundColor: 'transparent', flex:1, flexDirection: 'column'
    },
    instructions: {
        marginTop: 20,
        marginBottom: 20,
    },
    wrapper: {
        
        backgroundColor: '#FFF',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 0,
        paddingHorizontal: 0
    },
    videowrapper: {        
        margin: 0,
        paddingVertical: 0
    },
    backStyle: {
        width: 30,
        height: 30
    },
    listPostContainer: {
        backgroundColor: 'red',
        paddingHorizontal:30,
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
    savedPostContainer: {
        width:deviceWidth-20,
        paddingVertical: 10,
        paddingHorizontal:10,
        flex:1,
        flexDirection: 'row',
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        justifyContent:'space-around',
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
    video_item_left: {
        width: deviceWidth / 2-15,    
        flex:1,
        borderRadius:5,        
        flexDirection: 'column',
        justifyContent: 'space-between', 
        backgroundColor:'#09aa77'      
    },
    block_video: { 
        borderTopLeftRadius:5,
        borderTopRightRadius:5,               
        zIndex:2,
        flex:1    
    },
    block_video_mirror: {
               
        flex:1,     
        borderRadius:5,       
    },
    video_column_right: {
        width: deviceWidth / 2-15,  
        flex:1, 
        borderRadius:5,
        //backgroundColor:'#09aa77',
        backgroundColor: 'blue',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    block_video_shadow: {
        flex:1,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        position:'absolute',
        width: deviceWidth / 2 - 15,
        height: deviceWidth / 2 - 15,
        backgroundColor:'black',
        opacity:0.2
    },
    block_video_shadow_play: {
        flex:1,
        borderRadius:5,
        width: 60,
        height: 60,
        top: (deviceWidth / 2 - 15) / 2 - 30,
        position:'absolute',
        alignSelf:'center',
        opacity: 1,
    },
    block_video_view: {
        flex:1,
        position:'absolute',
        width: deviceWidth / 2 - 15,
        height: deviceWidth / 2 - 15,
       
    },
    block_video_bottom: {
        flex:1,
        paddingTop:5, 
        paddingBottom:10, 
        paddingHorizontal:10,      
    },
    block_video_view_counter_bottom: {
        flex:1,
        position:'absolute',
        top: (deviceWidth / 2 - 15)*4/5,
        width: deviceWidth / 2 - 15,
        height: (deviceWidth / 2 - 15)/5,
        backgroundColor:'black',
        opacity:0.2,
    },
    block_video_view_counter_info: {
        flex:1,
        position:'absolute',
        flexDirection:'column',
        justifyContent:'space-between',
        top: (deviceWidth / 2 - 15)*4/5,
        width: deviceWidth / 2 - 15
    },
    block_video_shadow_view: {
        borderRadius:5,
        width: 60,
        height: 60,
        top: (deviceWidth / 2 - 15) / 2 - 30,
        position:'absolute',
        alignSelf:'center',
        opacity: 2,
    },
    postImageCol: {

        width: deviceWidth / 2 - 20,
        height: deviceWidth / 3,
        resizeMode: 'cover',
    },
    block_post_half_width: {

        width: deviceWidth / 2 - 20,
    },
    
    block_post_half_width_image: {
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        width: deviceWidth / 2 - 15,
        height: deviceWidth / 2 - 15,
        resizeMode: 'cover',
    },
    imageCol: {
        width: deviceWidth / 2,
        height: deviceWidth / 2,

    },
    postInfoCol: {
        paddingTop:5,
        justifyContent: 'space-between',
        flexDirection:'column',
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
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    postImageFullRow: {
        borderRadius:5,
        width: deviceWidth-20,
        height: deviceWidth/2,
        resizeMode: 'cover',
    },
    imageFullRow: {
        width: deviceWidth ,
        height: deviceWidth *2/ 3,

    },
    postInfoFullRow: {
        paddingTop:5,
        paddingHorizontal:5,
        width: deviceWidth-20,
        justifyContent: 'space-between',
        
        flex: 1,
        flexDirection:'column'
    },
    bannerFullRow: {
        paddingHorizontal:5,
        width: deviceWidth-10,
        alignSelf: 'stretch',
        textAlign: 'center',       
        flex: 1,
        flexDirection:'column'
    },
    postDate:{
        color:'silver', fontSize:10, fontStyle:'italic', 
    },
    postMiddleDate:{
        color:'black', fontSize:10, 
    },
    postDetailDate:{
        alignSelf:'center',
        color:'silver', fontSize:10, fontStyle:'italic', 
    },
    postDetailMiddleDate:{
        alignSelf:'center',
        color:'black', fontSize:10, 
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
    txtPostHeader: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '400'
    },
    txtPostTitle: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '400'
    },
    txtMediumTitle: {
        fontFamily: 'Avenir',
        fontSize: 14,
        fontWeight: '400'
    },
    txtMediumVideoTitle: {
        fontFamily: 'Avenir',
        fontSize: 14,
        color:'#FFF',
        fontWeight: '400',
        textShadowColor:'#636664',
        textShadowRadius:1,
        textShadowOffset:{width:1, height:1}
    },
    txtSmallTitle: {
        fontFamily: 'Avenir',
        fontSize: 12,
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
    title:{
        color: "#FFF",
        fontWeight:'lighter'
    },
    mb: {
      marginBottom: 15
    },

    search_postContainer: {
        width: deviceWidth,

        flex: 1,
        flexDirection: 'row',
        
        justifyContent: 'space-between',
    },
    search_content: {
        width: deviceWidth - 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        backgroundColor:'#FFF',
        flexDirection: 'row',
    },
    search_postInfo: {
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
};


