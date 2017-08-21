import React, { Component } from "react";
import { Image } from "react-native";


import {
	Content,
	Text,
	Thumbnail,
	Icon,
	Title,
	Container,
	View,
	StyleProvider,

} from "native-base";

import styles from "./style";
import StorageApi from '../../api/storagePosts';
export default class Favorite extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            icons:[]
        }
    }
    // eslint-disable-line
    componentDidMount() {
        StorageApi.getPosts().then((result)=> {
            let posts = JSON.parse(result);
            posts = posts!=null?posts:[];
            
            let currentPos = 0;
            let icons = posts.filter((item)=> {
                currentPos++;
                if(currentPos<=2){
                    return item;
                }
            });
              
            this.setState({
                        isLoading: false,
                        icons: icons,
                    }, function () {
                        // do something with new state
                    });
         });
    }

    render (){
        if (this.state.isLoading && this.state.icons!=null && this.state.icons.length>0) {
            return (
                <View style={{ flex: 1 }}>
                    
                </View>
            );
            
        }
        return (
            <View>
                {
                    this.state.icons.map((item)=>{
                        return (<Thumbnail key={item.postid} style={styles.drawerIconSlidebar} square size={80} source={{ uri: item.image }} />  );
                    })
                     
                }
            </View>
        );
    }
}