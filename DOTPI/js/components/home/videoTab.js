import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, SectionList,TouchableOpacity, StyleSheet,FlatList } from "react-native";
import PushNotification from 'react-native-push-notification';
import {
    Button,
    Icon,
    Text, View,
    Badget,
    Toast,
    Spinner
} from 'native-base';
import DateHelper from '../../utilities/dateHelper';
import NotificationHelper from '../../utilities/notificationHelper';
import SinglePost from './singlePost';
import TwinPostRow from './twinPostRow';
import TwinPostColumn from './twinPostColumn';
import styles from './styles';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const logo = require("../../../img/logo.png");
const playicon = require("../../../img/play.png");
class VideoTab extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            listPosts: ds,
            refreshing: false,
            isLoading: true,
            page: 1,
            notificationData:{}
        };
        this.arr = [];
        
        //this.placementid = this.props.placementid
    }

    componentDidMount() {

        this.getVideos(1)
            .then(responseJson => {
                
                responseJson = responseJson==null?[]:responseJson;
                
                this.arr = this.arr.concat(responseJson);       
                     
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    listPosts: this.state.listPosts.cloneWithRows(this.arr)
                }, function () {     
                   
                    // do something with new state
                });               
                 
            });

    }

    onLoadMore() {
        
        
        if (!this.state.refreshing) {
            const newPage = this.state.page + 1;
            this.setState({ refreshing: true, isLoading: false });

            // Toast.show({
            //                                     text: 'Page:'+ newPage,
            //                                     position: 'bottom',
            //                                     type: 'success',
            //                                     duration: 1000
            //                                 }) ;
            this.getVideos(newPage).then(responseJson => {
                responseJson = responseJson==null?[]:responseJson;
                
                this.arr = this.arr.concat(responseJson);     

                this.setState({
                    isLoading: false,
                    refreshing: false,
                    page: newPage,
                    listPosts: this.state.listPosts.cloneWithRows(this.arr),
                }, function () {
                    // do something with new state
                });
            });
        }
        
    }

    
    getVideos(page) {
        var url = this.props.url + "/" + page;
      
        return fetch(url)
            .then((response) =>response.json())
            .catch((error) => {
                
                NotificationHelper.Notify('Kết nối không thành công!');
                this.props.navigation.navigate('SplashScreen');
              });
    }
  

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1,backgroundColor: "#34B089"  }}>
                    <Spinner style={{ paddingTop: deviceHeight / 2 }} color='green' />
                </View>
            );
        }

        let pos = 0;
        const { root } = this.props;
        return (
            <View style={styles.videocontainer}>
                 <View style={styles.videowrapper}>
                    <ListView style={{ paddingLeft:10, paddingRight:10, paddingTop:10, paddingBottom:10}}
                        keyExtractor={post => { return ('FlatItem-' + post.id); }}
                        enableEmptySections={true}
                        dataSource={this.state.listPosts}
                        renderRow={(item) => {
                            pos = pos + 1;
                            let post = item;
                            if (post != null) {
                                return(
                                <View key={post.id} style={styles.video_item}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Youtube', { post: post.sections[0] })}>
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
                                        (<TouchableOpacity onPress={() => this.props.navigation.navigate('Youtube', { post: post.sections[1] })}>
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
                                                        <View style={{ flex:1,  flexDirection: 'row', paddingLeft:10,paddingRight:10,paddingTop:10, alignSelf:'center'}}>
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
                                )
                            }
                            else {
                                return(<View></View>)
                            }


                        }


                        }
                        
                        onEndReached={this.onLoadMore.bind(this)}
                    />
                </View>
            </View>
        );
    }

}



export default VideoTab
