const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    //position: "absolute",
    left: Platform.OS === "android" ? ((deviceHeight > deviceWidth) ? deviceWidth / 2 - 160 /2 :deviceWidth / 2 - 160/2):deviceWidth / 2 - 160/2,
    top: Platform.OS === "android" ? ((deviceHeight > deviceWidth) ? deviceWidth / 8 - 160 /2 :deviceWidth / 8 - 160/2):deviceWidth / 8 - 160/2,
    width: 160,
    height: 160
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  }
};
