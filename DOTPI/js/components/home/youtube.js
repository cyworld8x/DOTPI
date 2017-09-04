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
  Spinner,
  Fab
} from "native-base";
import YouTube from 'react-native-youtube';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { connect } from 'react-redux';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
import styles from "./styles";
import DateHelper from "../../utilities/dateHelper";
import NotificationHelper from "../../utilities/notificationHelper";

const playicon = require("../../../img/play.png");
class Youtube extends Component {
    constructor(props) {
      super(props);
      this.state = {
          visible: false,          
          isLoading: true,
          isShowAd:true,
          isLoadingMore:true,
          isPlay:true
      }; 
      
    }
    
    togglePlay(){
      
      this.setState({
        isPlay : !this.state.isPlay
      })
    }

    componentDidMount() {
     
      var url = this.props.navigation.state.params.post.api;
      
      return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
             
              if (responseJson.length > 0) {
                  this.arr = responseJson[0].posts;
                  this.setState({
                      isLoading: false,
                      isLoadingMore:false,
                      video: responseJson[0],
                      videos: responseJson[0].posts,
                      isShowAd: true,
                  }, function () {
                      
                      //this.saveUserState();
                  });
                  
              }

          })
          .catch((error) => {
              
              NotificationHelper.Notify('Kết nối không thành công!');
              this.props.navigation.navigate('SplashScreen');
          });
  }
  play(){
    //NotificationHelper.Notify(this.props.Settings.ApiKey);
    YouTubeStandaloneAndroid.playVideo({
      apiKey: this.props.Settings.ApiKey,     // Your YouTube Developer API Key
      videoId: this.state.video.videoid,     // YouTube video ID
      autoplay: true,             // Autoplay the video
      startTime: 0,             // Starting point of video (in seconds)
    })
      .then(() => {})
      .catch(errorMessage => NotificationHelper.Notify(errorMessage))
  }
  loadVideo(video){
      this.setState({
        video:video,
        isLoadingMore:true
      })
      return fetch(video.api)
      .then((response) => response.json())
      .then((responseJson) => {
        
          if (responseJson.length > 0) {
              this.arr = responseJson[0].posts;
              this.setState({
                  videos: responseJson[0].posts,
                  isShowAd: true,
                  isLoadingMore:false,
                  isPlay:true
              }, function () {
                  
                  //this.saveUserState();
              });
              
          }

      })
      .catch((error) => {
          
          NotificationHelper.Notify('Kết nối không thành công!');
          this.props.navigation.navigate('SplashScreen');
      });
  }
  render() {   
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1,backgroundColor: '#34B089' }}>
          <Header style={{ backgroundColor: '#34B089' }}>
            <Left />

            <Body>
              <Text style={{ color: "#FFF", fontWeight: '300' }}>MÓN ĂN NGON</Text>
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
          <View style={{ flex: 1 }}>
            <Spinner style={{ paddingTop: deviceWidth }} color='green' />
          </View>
        </View>
      );

    }
    return (
      <View style={{flex:1,backgroundColor: '#34B089'}} >
        <Header  hasTabs style={{ backgroundColor: '#34B089' }}>
          <Left>
            <Button
              transparent
              onPress={() => {  this.props.navigation.navigate('Category', { url: this.state.video.url, title: this.state.video.categoryname, categoryid: this.state.video.categoryid, categorytype:'video' })}}
            >
              <Icon style={{ color: "#FFF" }} name="md-arrow-round-back" />
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
        
        <View style={styles.videocontainer}>
          <View style={styles.videowrapper}>
          { this.state.video!=null &&
            (<View style={styles.video_single_top}>
              <View style={{ borderTopLeftRadius:5, zIndex:1, borderTopRightRadius:5, alignSelf:'stretch', width:deviceWidth-20, height: 220, backgroundColor:'#09aa77' }}>
                  <Image style={{ flex:1,        
                width:deviceWidth-20,
                height: 240,borderTopLeftRadius:5, borderTopRightRadius:5,
                position:'absolute',
                alignSelf:'center'}} source={{uri:this.state.video.image}} />
              </View>
              <YouTube
              apiKey={this.props.Settings.ApiKey}
              ref={(component) => { this._youTubePlayer = component }}
              videoId={this.state.video.videoid}           // The YouTube video ID 
              //playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId` 
              play={this.state.isPlay}                     // control playback of video with true/false 
              //playsInline={true}              // control whether the video should play full-screen or inline 
                             // control whether the video should loop when ended 
              
              controls={2}
              fullscreen={false}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onChangeFullscreen={e => {this.setState({ fullscreen: e.isFullscreen })}}
              onError={e => {NotificationHelper.Notify(e.error)}}
              style={{ position:'absolute', zIndex:2, borderTopLeftRadius:5, borderTopRightRadius:5, alignSelf:'center', width:deviceWidth-20, height: 220, backgroundColor:'#09aa77' }}
            />
            <View style={{ width: deviceWidth - 20, height: deviceHeight / 16, backgroundColor:'#09aa77', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 3, backgroundColor: 'black', flexDirection:'row', justifyContent:'space-between', opacity:0.6 }}>
                  <View  style={styles.single_video_bottom_info}  >
                    <TouchableOpacity transparent onPress={()=> this.togglePlay()} style={{alignSelf: 'center' }}>
                    <Icon style={{ color: this.state.isPlay?'#FFF':'#000', paddingLeft:5, alignSelf: 'center' }} fontSize="8" name={this.state.isPlay?'md-eye':'md-eye-off'} />
                    </TouchableOpacity>
                    <Text  style={styles.txtSmallVideoTitleCenter}>{DateHelper.getViewVideo(this.state.video.date, this.state.video.id)}</Text>
                    
                  </View>

                </View>
                
                <View style={{ flex: 7, backgroundColor: 'black',opacity:0.4  }}>
                  <View style={styles.single_video_bottom_info}>
                     <Text style={styles.txtMediumVideoTitle}>{this.state.video.title}</Text>
                  </View>

                </View>
              </View>
            </View>)
            }
          <ScrollView ref='_scrollView' scrollEnabled={true} >
            
            {!this.state.isLoadingMore?(
              <View style={styles.video_single_bottom}>

              {this.state.videos!=null && this.state.videos.length>0&&
              <View style={{ borderBottomLeftRadius:5, paddingBottom:10, borderBottomRightRadius:5,width:deviceWidth-20, height: 40, backgroundColor:'#09aa77'}}>
                <View style={{ height: 40,   position: 'absolute', width: deviceWidth - 20, backgroundColor: 'black', opacity:0.5, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  
                </View>
                <Text style={styles.txt_single_video_date}>Các video khác cùng chuyên mục</Text>
              </View>}
              
              <View style={{ borderBottomLeftRadius:5, paddingBottom:0, borderBottomRightRadius:5,width:deviceWidth-20,backgroundColor:'#1db988', flex:1, alignSelf:'stretch', flexDirection:'column', justifyContent:'space-between'}}>
              {this.state.videos!=null && this.state.videos.length>0 &&  this.state.videos.map((post) => {
                return (
                <View key={post.id} style={styles.video_item}>
                                    <TouchableOpacity onPress={() => this.loadVideo(post.sections[0])}>
                                        <View style={styles.video_item_left}>
                                           
                                            <View style={styles.block_video} >
                                                {post.sections[0] != null && post.sections[0].image != null ? <Image style={styles.block_post_half_width_image} source={{ uri: post.sections[0].image }} /> : <Image style={styles.block_post_half_width_image} source={logo} />}
                                                <View style={styles.block_video_shadow} >                                                     
                                                </View>                                                
                                                <Image style={styles.block_video_shadow_play} source={ playicon } />
                                                <View style={styles.block_video_view} >  
                                                    <View style={styles.block_video_view_counter_bottom} >                                                     
                                                    </View> 
                                                    <View style={styles.block_video_view_counter_info} >  
                                                        <View style={{ flex:1, flexDirection: 'row', paddingLeft:10,paddingRight:10,paddingTop:10, alignSelf:'center'}}>
                                                            <Text style={styles.postDate}>{DateHelper.getLongDateVideo(post.sections[0].date)}</Text>
                                                            <Text style={styles.postMiddleDate} > | </Text>
                                                            <Text style={styles.postDate}>{DateHelper.getView(post.sections[0].date, post.sections[0].id)}</Text>
                                                        </View>                                     
                                                    </View>                                                   
                                                </View>
                                               
                                            </View>
                                            
                                            <View style={styles.block_video_mirror} >
                                                <View style={styles.block_video_bottom} >
                                                    <Text style={styles.txtMediumVideoTitle}>{post.sections[0].title}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                    {post.sections[1] != null ?
                                        (<TouchableOpacity onPress={() => this.loadVideo(post.sections[1])}>
                                        <View style={styles.video_item_left}>
                                           
                                            <View style={styles.block_video} >
                                                {post.sections[1] != null && post.sections[1].image != null ? <Image style={styles.block_post_half_width_image} source={{ uri: post.sections[1].image }} /> : <Image style={styles.block_post_half_width_image} source={logo} />}
                                                <View style={styles.block_video_shadow} >                                                     
                                                </View>                                                
                                                <Image style={styles.block_video_shadow_play} source={ playicon } />
                                                <View style={styles.block_video_view} >  
                                                    <View style={styles.block_video_view_counter_bottom} >                                                     
                                                    </View> 
                                                    <View style={styles.block_video_view_counter_info} >  
                                                        <View style={{ flex:1, flexDirection: 'row', paddingLeft:10,paddingRight:10,paddingTop:10, alignSelf:'center'}}>
                                                            <Text style={styles.postDate}>{DateHelper.getLongDateVideo(post.sections[1].date)}</Text>
                                                            <Text style={styles.postMiddleDate} > | </Text>
                                                            <Text style={styles.postDate}>{DateHelper.getView(post.sections[1].date, post.sections[1].id)}</Text>
                                                        </View>                                     
                                                    </View>                                                   
                                                </View>
                                               
                                            </View>
                                            
                                            <View style={styles.block_video_mirror} >

                                                <View style={styles.block_video_bottom} >
                                                    <Text style={styles.txtMediumVideoTitle}>{post.sections[0].title}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>) : (<View></View>)}

                                </View>
              );})
              }
              </View>
            </View>
            ):(<View style={styles.video_single_bottom}>
                                      <Spinner style={{ paddingTop: 160, paddingBottom:10 }} color='white' /></View>)}
            
            </ScrollView> 
            <Fab
              direction="up"
              containerStyle={{}}
              style={{ backgroundColor: '#34B089' }}
              position="bottomRight"
              onPress={() => this.play()}>
              <Icon name="md-expand" color='#FFF'/>

            </Fab>
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

export default connect(mapStateToProps)(Youtube);




