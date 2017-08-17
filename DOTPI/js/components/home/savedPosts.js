import React, { Component } from 'react';
import { Image, Dimensions,WebView,ActivityIndicator,ListView,TouchableOpacity ,RefreshControl,StyleSheet } from "react-native";

import { Container,Header,  Title, Content, Button,
  Icon,
  Card,
  CardItem, Text, View, Thumbnail,
  Left,
  Right,
  Body,
  Fab,
  Spinner,
  DeckSwiper,
  IconNB,
Toast } from 'native-base';

import styles from './styles';
import HTMLView from 'react-native-htmlview';

const deviceWidth = Dimensions.get("window").width;

const logo = require("../../../img/logo.png");
const cardImage = require("../../../img/drawer-cover.png");

import StorageApi from '../../api/storagePosts';
class SavedPosts extends Component {
	//eslint-disable-line
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            listPosts: ds,
            isLoading: true
        };
        this.arr = [];
    }
   
	componentDidMount() {
         StorageApi.getPosts().then((result)=> {
            let posts = JSON.parse(result);
            
            this.arr = posts;
              
            this.setState({
                        isLoading: false,
                        listPosts: this.state.listPosts.cloneWithRows(this.arr),
                    }, function () {
                        // do something with new state
                    });
         });
        
    }    

    async deletePost(post) {
        var posts =await StorageApi.deletePost(post);
        this.arr = posts;

        this.setState({
            isLoading: false,
            listPosts: this.state.listPosts.cloneWithRows(this.arr),
        }, function () {
            Toast.show({
              text: 'Bài viết đã được xóa!',
              position: 'bottom',
              type:'success',
              duration:1000
            })
        });
    }
 
    render() {
        if (this.state.isLoading) {
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <Spinner color='green' />
            </View>
        );
    }
    
   

    
        const { root } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                        <TouchableOpacity >
                            <Image  style={styles.backStyle} />
                        </TouchableOpacity>
                        <Text style={styles.titleStyle}>Danh sách đã lưu</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <ListView 
                     key={this._data}
                        removeClippedSubviews={false}
                        dataSource={this.state.listPosts}
                        renderRow={post => (
                            <View style={styles.postContainer}>
                                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Post', {post:post} )}>
                                  <Thumbnail  size={80} source={{ uri:  post.image  }} />                 
                                       
                                {/* <Image style={styles.postImage} source={{ uri: post.image }} />  */}
                               
                                 </TouchableOpacity>
                                  <View style={styles.postInfo}>
                                    <Text style={styles.txtColor}>{post.title}</Text>
                                  
                                </View>
                               
                                <Button  danger rounded bordered  style={{marginLeft:5}}  onPress={() => this.deletePost(post)}>
                                        <Icon active name="trash" />
                                    </Button>
                            </View>
                            
                            
                        )}
                            
                       
                    />
                </View>
            </View>
        );
    }
    
}
export default SavedPosts;
