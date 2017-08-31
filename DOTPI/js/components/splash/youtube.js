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
import YouTube from 'react-native-youtube';
const launchscreenLogo = require("../../../img/version.png");
import styles from "./styles";
class Youtube extends Component {
    constructor(props) {
        super(props);    
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
              <YouTube
              apiKey = 'AIzaSyBK2_RyDRiuQmJHKKYdjVdDSZX3iSqqlvk'
              ref={(component) => { this._youTubePlayer = component }}
              videoId="KVZ-P-ZI6W4"           // The YouTube video ID 
              playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId` 
              play={true}                     // control playback of video with true/false 
              //playsInline={true}              // control whether the video should play full-screen or inline 
              loop={true}                    // control whether the video should loop when ended 
              fullscreen ={true}
              onReady={e => this.setState({ isReady: true })}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => this.setState({ error: e.error })}
              onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}
            
              style={{ alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10 }}
            />
						
					</View>
      </View>     
    );
  }
}

export default  Youtube;



