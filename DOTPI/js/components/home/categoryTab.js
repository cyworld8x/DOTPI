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
    Toast
} from 'native-base';

import styles from './styles';
import HTMLView from 'react-native-htmlview';

const deviceWidth = Dimensions.get("window").width;

const logo = require("../../../img/logo.png");
const cardImage = require("../../../img/drawer-cover.png");

class CategoryTab extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            listPosts: ds,
            refreshing: false,
            isLoading: true,
            page: 1
        };
        this.arr = [];
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
                }, function () {
                    // do something with new state
                });
            });

    }

    onRefresh() {
        
         const newPage = this.state.page + 1;
        console.error(newPage);
        this.setState({ refreshing: true, isLoading: false });
       
        // Toast.show({
        //                                     text: 'Page:'+ newPage,
        //                                     position: 'bottom',
        //                                     type: 'success',
        //                                     duration: 1000
        //                                 }) ;
        this.getPosts(newPage).then(responseJson => {
            responseJson = responseJson==null?[]:responseJson;
            this.arr = responseJson.concat(this.arr);
            
            this.setState({
                isLoading: false,
                refreshing: false,
                listPosts: this.state.listPosts.cloneWithRows(this.arr),
            }, function () {
                // do something with new state
            });
        });;
    }

    getPosts(page) {
        var url = this.props.url + "/" + page;
        
        return fetch(url)
            .then((response) => response.json());
    }

  refreshControl(){
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this.onRefresh()} />
    )
  }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    {/* <ActivityIndicator /> */}
                </View>
            );
        }

        //    var news = this.state.dataSource.map((item)=>{

        //      return (

        //       <Card key={item.id}>
        //           <CardItem>
        //            <Image  style={{height: 200, width: 200, flex: 1}}/> 
        //           <Text>{item.title}</Text>
        //           <Text>{item.image}</Text>
        //           </CardItem>
        //       </Card>

        //           );
        // });

        // return (
        //   <Container>
        //     <View style={{flex:1}}>
        //       {news}
        //     </View>
        //   </Container>
        // );


        const { root } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                        <TouchableOpacity >
                            <Image style={styles.backStyle} />
                        </TouchableOpacity>
                        <Text style={styles.titleStyle}>{this.props.name}</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <ListView
                        enableEmptySections={true}
                        removeClippedSubviews={false}
                        dataSource={this.state.listPosts}
                        renderRow={post => (
                            <View style={styles.postContainer}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post })}>


                                    <Image style={styles.postImage} source={{ uri: post.image }} />

                                </TouchableOpacity>
                                <View style={styles.postInfo}>
                                    <Text style={styles.txtName}>{post.name}</Text>
                                    <View style={styles.lastRowInfo}>
                                        <Text style={styles.txtColor}>{post.title}</Text>
                                        <View style={{ backgroundColor: '#fff', height: 16, width: 16, borderRadius: 8 }} />

                                    </View>
                                </View>
                            </View>
                        )}
                        onEndReachedThreshold={2}
                        onEndReached={this.onRefresh.bind(this)}
                    />
                </View>
            </View>
        );
    }

}
export default CategoryTab;
