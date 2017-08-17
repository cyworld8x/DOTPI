import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, TouchableOpacity, RefreshControl, StyleSheet } from "react-native";


import Icon from 'react-native-fa-icons';
import {
    Container, Header, Title, Content, Button,
    
    Card,
    CardItem, Text, View, Thumbnail,
    Left,
    Right,
    Body,
    Fab,
    DeckSwiper,
    IconNB,
    Toast
} from 'native-base';
const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;
import styles from './styles';
import StorageApi from '../../api/storagePosts';
import HTMLView from 'react-native-htmlview';

class Post extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }

    async savePost(post){
       
        var result =await StorageApi.addPost({postid:post.postid,title:post.title, image:post.image, api:this.props.navigation.state.params.post.api});
        Toast.show({
            text: 'Bài viết đã được lưu để xem sau!',
            position: 'bottom',
            type: 'success',
            duration: 1000
        })
    }

    componentDidMount() {
        var url = this.props.navigation.state.params.post.api;
        
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                
                if (responseJson.length > 0) {
                   
                    this.setState({
                        isLoading: false,
                        post: responseJson[0],
                    }, function () {
                        
                    });
                  
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
  
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
            
        }
        let htmlStyle = `<style>
                       
                        body {
                          width:100%;
                        }
                        h2 {
                          font-size: 48px;
                        }
                        p {
                          font-size: 18px;
                        }
                        h3 {
                          font-size: 32px
                        }
                        img {
                          width:96%;
                        }
                        td {
                          display: block !important;
                          width: 95% !important;
                        }
                        img {
                          width:98%;
                        }
                        hr {
                          width: 98%;
                        }
                        ol li ol li ol li {
                          position: relative; right: 85px;
                        }
                        ul {
                          width: 98%,
                          margin-left: -25px;
                        }
                        li {
                          width: 98%;
                        }
                        .tabs {
                          display: none;
                        }
                        .tabs > li {
                          display: none;
                        }
                        .tabs-content {
                          padding: 0;
                          list-style-type: none;
                        }
                        tr {
                          display: flex;
                          flex-direction: column;
                        }
               </style>`
         return (
             <Container style={{ backgroundColor: '#FFF', flex:1 }} >
                 <Header style={{ backgroundColor: '#FFF' }}>
                     <Left>
                         <Button
                             transparent
                             onPress={() => this.props.navigation.goBack()}
                         >
                             <Icon style={{ color: "#000" }} name="arrow-left" />
                         </Button>
                     </Left>
                     <Body>
                         <Title style={{ color: "#000" }}>DOTPI </Title>
                     </Body>
                     <Right >
                         <Button
                             transparent
                             onPress={() => this.savePost(this.state.post)}
                         >
                             <Icon style={{ color: "#000" }} name="bookmark"  />
                         </Button>
                          </Right >
                 </Header>
                   <WebView source={{html: htmlStyle+this.state.post.content}} style={{flex:1}} scalesPageToFit={true} scrollEnabled={false}/>
                 {/* <Content style={{flex:1}} >
                       <HTMLView style={{flex:1}} value={ this.state.post.content.replace("\n", "") } 
                     textComponentProps = {{ style: { color: '#231F20',
        fontSize: 14,
        lineHeight: 18} }}
                     renderNode={this.renderNode} /
                     >  
                    
                 </Content> */}
             </Container>
                );
    }
    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const src = node.attribs.src;
            
            return (
    //             <View style={{flex: 1,
    // alignItems: 'stretch'}}>
                <Image style={{
                    flex: 1, 
                    alignSelf: 'stretch',
     height: deviceHeight,
    width: deviceWidth,
     borderWidth: 1,
    borderRadius: 75
                }} source={{ uri: src , cache: 'only-if-cached'}} resizeMode="contain"/>
            //    </View >
            )
        }
    }
}

export default Post;
