import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, TouchableOpacity, RefreshControl, ScrollView, StyleSheet,Clipboard, Platform, ToastAndroid,AlertIOS } from "react-native";

import {
  Container,
  Header,
  Title,  
  View,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Text,
  Spinner

} from "native-base";
import { connect } from 'react-redux';
import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;
class PromotionPage extends Component {
    constructor(props) {
        super(props);   
        this.page = null;
        try{
          this.page = this.props.navigation.state.params; 
          if(this.page==null){
            this.page= this.props.Settings.Notification.Navigation.Data;
          }
        }catch(error){

        }
        
    }
  
  componentDidMount() {
  }

  render() {       
    return (
      <View style={{flex:1,backgroundColor: '#34B089'}} >
        <Header  hasTabs style={{ backgroundColor: '#34B089' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={{ color: "#FFF" }} name="menu" />
            </Button>
          </Left>
            <Body>
              <Text style={{ color: "#FFF", fontWeight:'300' }}>MÓN ĂN NGON</Text>
            </Body>
            <Right >
                <Button
                    transparent
                    onPress={() => this.props.navigation.navigate('Home')}
                >
                    <Icon style={{ color: "#FFF" }} name="md-home" />
                </Button>
            </Right >
          
        </Header>
        <View  style={{flex: 1,backgroundColor:'#34B089'}}>
						<View style={{flex: 1}}>
              
            {this.page!=null && this.page.Type=='web' && (<WebView source={{ uri: this.page.Source  }} domStorageEnabled={true}
									style={{ padding: 10 }}
									automaticallyAdjustContentInsets={false}
									renderLoading={() => {
										return (<View style={{ flex: 1 }}>
											<Spinner style={{ paddingTop: 200 }} color='green' />
										</View>)
									}} />)}
							{this.page!=null && this.page.Type=='image' &&
								(<TouchableOpacity style={{ flex:1, width:deviceWidth, height:deviceHeight-40}}>
									<Image style={{ flex:1, width:deviceWidth, height:deviceHeight-40, resizeMode:'stretch'}} source={{ uri:this.page.Source}} />
								</TouchableOpacity>)
							}	
						</View>
						
					</View>
      </View>     
    );
  }
}


function mapStateToProps(state) {
  return { 
     Settings: state.Settings
  };
}

export default connect(mapStateToProps)(PromotionPage);



