import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, TouchableOpacity, RefreshControl, StyleSheet } from "react-native";


import {
    Container, Header, Title, Content, Button,
    Icon,
    Card,
    CardItem, Text, View, Thumbnail,
    Left,
    Right,
    Body,
    Fab,
    DeckSwiper,
    IconNB
} from 'native-base';
const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;
import styles from './styles';
import HTMLView from 'react-native-htmlview';

class Post extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
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
                        // do something with new state
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
         return (
                    <Container style={{ flex: 1 }}  >
                       <WebView source={{uri:this.state.post.uri}}/>
                       
                    </Container>
                );
    }
    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const src = node.attribs.src;
            
            return (
                <Image style={{
                    flex: 1,  justifyContent: 'center',
                    alignItems: 'center', width:deviceWidth, height:deviceHeight
                }} source={{ uri: src }} />
               
            )
        }
    }
}

export default Post;