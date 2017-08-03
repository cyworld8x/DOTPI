const React = require("react-native");

const { StyleSheet } = React;

export default {
  container: {
     flex: 1,
     color:'#FFF',
        backgroundColor: '#DBDBD8'
  } ,
       header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    wrapper: {
        backgroundColor: '#fff',
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        margin: 10,
        paddingHorizontal: 10
    },
    backStyle: {
        width: 30,
        height: 30
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    titleStyle: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 20
    },
    productImage: {
        width: 80,
        height: (80 * 452) / 361,
        flex:1
    },
    productInfo: {
        justifyContent: 'space-between',
        marginLeft: 15,
        flex: 1
    },
    lastRowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
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


