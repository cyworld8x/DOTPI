const React = require("react-native");

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  sidebar: {
    flex: 1,
    backgroundColor: "#60c49e"
  },
  drawerCover: {
    alignSelf: "stretch",
    // resizeMode: 'cover',
    height: deviceHeight,
    width: null,
    position: "relative",
    marginBottom: 0
  },
  drawerHeaderCover: {
    alignSelf: "stretch",
    // resizeMode: 'cover',
    height: deviceHeight/5,
    width: null,
    position: "relative",
    
    marginBottom: 0
  },
  drawerSlidebar: {
    
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
    flexDirection:'row',
    
  },
  drawerLogoSlidebar: {
   
    width: 80,
    height: 80,
    right:5,
    resizeMode: "cover"
  },

  drawerIconSlidebar: {
    top:10,
    left:5,
    borderRadius:5,
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderColor:'#FFF',
    borderWidth:2
  },
  drawerProfile: {
    
    left: Platform.OS === "android" ? deviceWidth / 10 + 5 : deviceWidth / 9 ,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: Platform.OS === "android" ? 7 : 5
  },
  sidebarIcon: {
    fontSize: 21,
    color: "#fff",
    lineHeight: Platform.OS === "android" ? 21 : 25,
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20
  },
  textSlideBar: {
   
    fontSize: 20,
    fontFamily:'monospace',
    marginLeft: 20,
    color: "whitesmoke"
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },

  profileText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    color:"#1EBC7C",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
};
