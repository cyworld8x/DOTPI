import React, { Component } from "react";
import { Image,TouchableOpacity } from "react-native";


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

import styles from "./styles";

export default class FullRowPost extends Component{
    constructor(props) {
        super(props);
        this.post = this.props.post;
        console.error(this.post);
    }
    // eslint-disable-line
    componentDidMount() {
        
    }

    render (){
       return(
           <View key={this.post.id} style={styles.postContainerCol}>
                <View  style={styles.postContentCol}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', { post: this.post.sections[0] })}>
                                <Image style={styles.postImage} source={{ uri: this.post.sections[0].image }} />
                            </TouchableOpacity>
                            <View style={styles.postInfo}>
                                <Text style={styles.txtName}>{this.post.sections[0].title}</Text>                                
                            </View>
                </View>
           
          </View>
       )
    }
}