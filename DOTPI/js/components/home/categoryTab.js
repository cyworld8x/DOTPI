import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, SectionList,TouchableOpacity, StyleSheet } from "react-native";
import PushNotification from 'react-native-push-notification';
import {
    Button,
    Icon,
    Text, View,
   
    Toast
} from 'native-base';
import Moment from 'moment';
import styles from './styles';
const deviceWidth = Dimensions.get("window").width;

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
        Moment.locale('en');
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

    onRefresh() {
        
        const newPage = this.state.page + 1;
        
        this.setState({ refreshing: true, isLoading: false });
       
        // Toast.show({
        //                                     text: 'Page:'+ newPage,
        //                                     position: 'bottom',
        //                                     type: 'success',
        //                                     duration: 1000
        //                                 }) ;
        this.getPosts(newPage).then(responseJson => {
            responseJson = responseJson==null?[]:responseJson;
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
                <View style={{ flex: 1, paddingTop: 20 }}>
                     <ActivityIndicator /> 
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
                                 return (<View key={post.id} style={styles.postContainerFullRow}>
                                        <View style={styles.postContentFullRow}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post.sections[0] })}>
                                                <Image style={styles.postImageFullRow} source={{ uri: post.sections[0].image }} />
                                            
                                            <View style={styles.postInfoFullRow}>
                                                <Text style={styles.txtName}>{post.sections[0].title}</Text>
                                            </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>)
                            }else{
                                    if (pos % 2 == 1 ) {
                                    return (<View key={post.id} style={styles.postContainerCol}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post.sections[0] })}>
                                            <View style={styles.postContentCol}>

                                                 {post.sections[0]!=null && post.sections[0].image!=null? <Image style={styles.postImageCol} source={{ uri: post.sections[0].image}}/>:<Image style={styles.postImageCol} source={logo} />} 

                                                <View style={styles.postInfoCol}>
                                                    <Text style={styles.txtName}>{post.sections[0].title}</Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                        {post.sections[1]!=null ?
                                        (<TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post.sections[1] })}>
                                            <View style={styles.postContentCol}>

                                                 {post.sections[1]!=null && post.sections[1].image!=null? <Image style={styles.postImageCol} source={{ uri: post.sections[1].image}}/>:<Image style={styles.postImageCol} source={logo} />} 

                                                <View style={styles.postInfoCol}>
                                                    <Text style={styles.txtName}>{post.sections[1].title}</Text>
                                                </View>

                                            </View>
                                        </TouchableOpacity>) :(<View></View>)}

                                    </View>)
                                    {/* return (<CouplePostsColumn navigation={this.props.navigation} post={post}/>) */ }
                                    } else {
                                        return (<View key={post.id} style={styles.postContainer}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post.sections[0] })}>
                                                <View style={styles.postContentTop}>
                                                     {post.sections[0]!=null && post.sections[0].image!=null? <Image style={styles.postImage} source={{ uri: post.sections[0].image}}/>:<Image style={styles.postImage} source={logo} />} 
                                                    
                                                    <View style={styles.postInfo}>
                                                        <Text style={styles.txtName}>{post.sections[0].title}</Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post.sections[1] })}>
                                                <View style={styles.postContent}>

                                                    {post.sections[1]!=null && post.sections[1].image!=null? <Image style={styles.postImage} source={{ uri: post.sections[1].image}}/>:<Image style={styles.postImage} source={logo} />} 
                                                    

                                                    <View style={styles.postInfo} >
                                                        <Text style={styles.txtName}>{post.sections[1].title}</Text>
                                                    </View>

                                                </View>
                                            </TouchableOpacity>

                                        </View>)
                                    }
                            }
                           
                        }


                        }
                       
                        onEndReached={this.onRefresh.bind(this)}
                    />
                </View>
            </View>
        );
    }

}
export default CategoryTab;
