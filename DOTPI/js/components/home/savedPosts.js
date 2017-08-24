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

import { connect } from 'react-redux';

import { unbookmarkPost, loadingDataStorage } from '../../api/actionCreators';
import styles from './styles';

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
        //console.error(this.props.FavoritedPosts);
    }
   
	componentDidMount() {
        this.arr = this.props.FavoritedPosts;

        this.setState({
            isLoading: false,
            listPosts: this.state.listPosts.cloneWithRows(this.arr),
        }, function () {

            // do something with new state
        });
        
    }    

    async deletePost(post) {
        this.props.unbookmarkPost(post);
        this.arr = this.arr.filter(item=> Number(item.postid)!=Number(post.postid));
       
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
        return (
            <View style={{ flex: 1 }} >

                 <Header style={{ backgroundColor: '#34B089' }}>
                    <Left >
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        >
                            <Icon style={{ color: "#FFF" }} name="menu" />
                        </Button>
                    </Left >
                    <Body>
                        <Text style={{ color: "#FFF", fontWeight:'300' }}>MÓN ĂN NGON</Text>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Icon style={{ color: "#FFF" }} name="md-home" />
                        </Button>
                    </Right>
                   
                     
                 </Header>
                 {
                     this.state.isLoading ? (
                         <View style={{ flex: 1 }}>
                             <Spinner color='green' />
                         </View>
                    ) : (<View style={{ flexDirection: 'column', flex:1, justifyContent: 'space-between', padding:10 }}>
                        <View style={{ backgroundColor:'#FFF', borderBottomWidth:2, borderBottomColor:'silver' }}>
                            <Title style={{ color: "black", paddingVertical:10  }}>DANH MỤC YÊU THÍCH</Title>
                        </View>
                        
                         <ListView
                                style={{ flex:1, borderBottomColor: 'silver', borderBottomWidth: 1, backgroundColor:'#FFF'}}
                                enableEmptySections={true}
                                key={this._data}
                                removeClippedSubviews={false}
                                dataSource={this.state.listPosts}
                                renderRow={post => (
                                    <View style={styles.savedPostContainer}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post })}>
                                            <Thumbnail size={80} source={{ uri: post.image }} />


                                        </TouchableOpacity>
                                        <View style={styles.postInfo}>
                                            <Text style={styles.txtPostTitle}>{post.title}</Text>

                                        </View>

                                        <Button danger rounded bordered style={{alignSelf:'center'}} onPress={() => this.deletePost(post)}>
                                            <Icon active name="trash" />
                                        </Button>
                                    </View>

                                )}
                            />
                    </View>)
                }
                </View>
        );
    }
    
}

function mapStateToProps(state) {
    return { 
       FavoritedPosts: state.Storage.FavoritedPosts
    };
}

export default connect(mapStateToProps,{ unbookmarkPost, loadingDataStorage })(SavedPosts);
