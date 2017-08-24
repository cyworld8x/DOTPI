import React, { Component } from "react";

import { ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import {
 
  View,
  Text

} from "native-base";
import styles from './styles';
import DateHelper from '../../utilities/dateHelper';

const logo = require("../../../img/logo.png");
export default class SinglePost extends Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        const  post  = this.props.post;
        
        const  navigation  = this.props.navigation;
        return (<View key={post.id} style={styles.postContainerFullRow}>
            <View style={styles.postContentFullRow}>
                <TouchableOpacity onPress={() => navigation.navigate('Post', { post: post })}>
                    {post!=null && post.image!=null ? <Image style={styles.postImageFullRow} source={{ uri: post.image}}/>:<Image style={styles.postImageFullRow} source={logo} />} 
                    
                    <View style={styles.postInfoFullRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.postDate}>{DateHelper.getLongDate(post.date)}</Text>
                            <Text style={styles.postMiddleDate} > | </Text>
                            <Text style={styles.postDate}>{DateHelper.getView(post.date, post.id)}</Text>
                        </View>
                        <Text style={styles.txtPostTitle}>{post.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>);
    }
}