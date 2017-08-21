import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, SectionList, TouchableOpacity, RefreshControl, StyleSheet } from "react-native";

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

class ListPosts extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
       
        this.state = {
            listPosts: [],
            refreshing: false,
            isLoading: true,
            page: 1
        };
        this.arr = [];
    }

    componentDidMount() {
        
        let responseJson = this.getPosts(1);
        responseJson = responseJson == null ? [] : responseJson;
        this.arr = responseJson;
        this.setState({
            isLoading: false,
            refreshing: false,
            listPosts: this.state.listPosts.cloneWithRows(this.arr),
        }, function () {
            // do something with new state
        });

    }

    preProcessList(posts){
        var convertedPosts = [];
        if(posts!=null && posts.length>0){
            for(var i = 1; i<=post.length; i++){
                if (i % 1 == 0) {
                    if(i<post.length){
                        convertedPosts.push({ id: post[i].postid+'-'+ posts[i+1].postid, left: post[i], right: posts[i++] })
                    }
                    
                }                
            }
            return convertedPosts;
        }
    }

    onRefresh() {
        
        const newPage = this.state.page + 1;
        
        this.setState({ refreshing: true, isLoading: false });
        var responseJson = this.getPosts(newPage);
          responseJson = responseJson==null?[]:responseJson;
            this.arr = this.arr.concat(responseJson);
            
            this.setState({
                isLoading: false,
                refreshing: false,
                page:newPage,
                listPosts: this.state.listPosts.cloneWithRows(this.arr),
            }, function () {
                // do something with new state
            });
    }

    getPosts(page) {
        var list = [];
        for(var i = page*10; i< page*10 + 10; i++){
            list.push({image:'https://maxcdn.icons8.com/Share/icon/color/Gaming//pokecoin1600.png', name: 'Name' + 1, title: 'Title'+ i});
        }
        
        return list;
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
                    
                    <View style={styles.listPostContainer}>
                        <SectionList
                           
                            dataSource={this.state.listPosts}
                            renderItem={post => (
                                <View style={styles.postContainer}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: post })}>


                                        <Image style={styles.postImage} source={{ uri: post.image }} />

                                    </TouchableOpacity>
                                    <View style={styles.postInfo}>
                                    
                                        <View style={styles.lastRowInfo}>
                                            <Text style={styles.txtColor}>{post.title}</Text>
                                        
                                        </View>
                                    </View>
                                </View>
                            )}
                            onEndReachedThreshold={2}
                            onEndReached={this.onRefresh.bind(this)}
                           
                        />
                    </View>
                </View>
            </View>
        );
    }

}
export default ListPosts;
