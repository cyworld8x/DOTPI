import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, SectionList,TouchableOpacity, StyleSheet } from "react-native";
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
import SinglePost from './singlePost';
import TwinPostRow from './twinPostRow';
import TwinPostColumn from './twinPostColumn';
import styles from './styles';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const logo = require("../../../img/logo.png");

class CategoryTab extends Component {
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
        this.preProcessList = this.preProcessList.bind(this);
        
    }

    componentDidMount() {

        this.getPosts(1)
            .then(responseJson => {
                responseJson = responseJson==null?[]:responseJson;
                
                this.arr = responseJson;                
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    listPosts: this.state.listPosts.cloneWithRows(this.arr),
                    notificationData: this.arr!=null && this.arr.length>0? this.arr[0].sections[0]:null
                }, function () {     
                    
                    // do something with new state
                });
                if(this.arr!=null && this.arr.length>0){
                   
                    
                    try {
                        let notificationId = this.props.categoryid;
                        PushNotification.cancelLocalNotifications({id: notificationId});
                        PushNotification.localNotificationSchedule({
                            id: notificationId,
                            foreground: false, // BOOLEAN: If the notification was received in foreground or not 
                            userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not 
                            message: this.state.notificationData.title, // STRING: The notification message 
                            data: {navigation: this.props.navigation, routeName:'Post',post:this.state.notificationData},
                            
                            date: new Date(Date.now()+(60 * 60 * 8 * 1000)),
                            //date: new Date(Date.now()),
                            //actions:''
                            //date: new Date(Date.now())
                        });
                    }
                    catch (error) {
                      console.error(error)
                    } 
                }
                 
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
            this.getPosts(newPage).then(responseJson => {
                responseJson = responseJson == null ? [] : responseJson;
                //responseJson = this.preProcessList(responseJson);
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

    getPosts(page) {
        var url = this.props.url + "/" + page;
        
        return fetch(url)
            .then((response) =>response.json());
    }

    preProcessList(posts){
        var convertedPosts = [];
       
        if(posts!=null && posts.length>0){
            for(var i = 0; i<posts.length; i++){
                if (i % 2 == 0) {
                    if(i+1<posts.length){
                        convertedPosts.push({ id: posts[i].postid+'-'+ posts[i+1].postid, left: posts[i], right: posts[i++] })
                    }
                    
                }                
            }
            return convertedPosts;
        }
        return convertedPosts;
    }

  

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1,backgroundColor: "#FFF"  }}>
                    <Spinner style={{ paddingTop: deviceHeight / 2 }} color='green' />
                </View>
            );
        }

        let pos = 0;
        const { root } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                   
                    <ListView
                        enableEmptySections={true}
                        removeClippedSubviews={false}
                        dataSource={this.state.listPosts}
                        renderRow={(post) => {
                            pos = pos + 1;
                            if(pos==1){
                                 return ( <SinglePost post={post.sections[0]} navigation={this.props.navigation}/>)
                            }else{
                                    if (pos % 2 == 1 ) {
                                        return (<TwinPostColumn post={post}  navigation={this.props.navigation} />)
                                    {/* return (<CouplePostsColumn navigation={this.props.navigation} post={post}/>) */ }
                                    } else {
                                        return (<TwinPostRow post={post}  navigation={this.props.navigation} />)
                                    }
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
export default CategoryTab;
