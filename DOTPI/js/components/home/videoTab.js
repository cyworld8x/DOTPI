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
import { connect } from 'react-redux';
const logo = require("../../../img/logo.png");

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
        var url =  this.props.Settings.ApiUrl +'video/' + page;
       
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
                        keyExtractor={post => { return ('FlatItem-' + post.id); }}
                        enableEmptySections={true}
                        dataSource={this.state.listPosts}
                        renderRow={(item) => {
                            pos = pos + 1;
                            let post = item;
                            if (post != null) {
                                return(
                                <View key={post.id} style={styles.postContainerCol}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[0] })}>
                                        <View style={styles.postContentCol}>

                                            {post.sections[0] != null && post.sections[0].image != null ? <Image style={styles.postImageCol} source={{ uri: post.sections[0].image }} /> : <Image style={styles.postImageCol} source={logo} />}

                                            <View style={styles.postInfoCol}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.postDate}>{DateHelper.getLongDate(post.sections[0].date)}</Text>
                                                    <Text style={styles.postMiddleDate} > | </Text>
                                                    <Text style={styles.postDate}>{DateHelper.getView(post.sections[0].date, post.sections[0].id)}</Text>
                                                </View>
                                                
                                                <Text style={styles.txtPostTitle}>{post.sections[1].title}</Text>
                                               

                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                    {post.sections[1] != null ?
                                        (<TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[1] })}>
                                            <View style={styles.postContentCol}>

                                                {post.sections[1] != null && post.sections[1].image != null ? <Image style={styles.postImageCol} source={{ uri: post.sections[1].image }} /> : <Image style={styles.postImageCol} source={logo} />}

                                                <View style={styles.postInfoCol}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.postDate}>{DateHelper.getLongDate(post.sections[1].date)}</Text>
                                                        <Text style={styles.postMiddleDate} > | </Text>
                                                        <Text style={styles.postDate}>{DateHelper.getView(post.sections[1].date, post.sections[1].id)}</Text>
                                                    </View>
                                                    <Text style={styles.txtPostTitle}>{post.sections[1].title}</Text>

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


function mapStateToProps(state) {
    return { 
	   Settings: state.Settings
    };
}

export default connect(mapStateToProps)(VideoTab);
