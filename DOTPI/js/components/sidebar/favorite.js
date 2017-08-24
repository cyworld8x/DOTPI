import React, { Component } from "react";
import { Image } from "react-native";


import { connect } from 'react-redux';
import {
    View,
	Thumbnail

} from "native-base";

import styles from "./style";
import StorageApi from '../../api/storagePosts';
export default class Favorite extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            
        }
        
    }
    // eslint-disable-line
    componentDidMount() {
        StorageApi.getPosts().then((data)=> {
            let posts=  JSON.parse(data);
            
            posts = posts.length>2 ? posts.slice(posts.length-2,posts.length):posts;
            this.setState({
                posts:posts
            });
        });
    }

    render (){
        
        return (
            <View style={{ flexDirection:'row'}}>
                {
                    this.state.posts && this.state.posts.map((item)=>{
                        return (<Thumbnail onPress={() => this.props.navigation.navigate('Post', { post: post })}  key={item.postid} style={styles.drawerIconSlidebar} square size={80} source={{ uri: item.image }} />  );
                    })
                     
                }
            </View>
        );
    }
}
