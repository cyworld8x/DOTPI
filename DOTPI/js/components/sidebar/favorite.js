import React, { Component } from "react";
import { Image } from "react-native";


import { connect } from 'react-redux';
import {
    View,
	Thumbnail

} from "native-base";

import styles from "./style";
import StorageApi from '../../api/storagePosts';
class Favorite extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            
        }
    }
    // eslint-disable-line
    componentDidMount() {
        this.setState({
            posts:this.props.FavoritedPosts
        });
    }

    render (){
        
        return (
            <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                {
                    this.state.posts && this.state.posts.map((item)=>{
                        return (<Thumbnail key={item.postid} style={styles.drawerIconSlidebar} square size={80} source={{ uri: item.image }} />  );
                    })
                     
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { 
       FavoritedPosts: state.posts
    };
}

export default connect(mapStateToProps)(Favorite);