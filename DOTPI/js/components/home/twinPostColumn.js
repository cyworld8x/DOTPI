import React, { Component } from "react";

import { ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import {
 
  View,
  Text

} from "native-base";
import styles from './styles';
import DateHelper from '../../utilities/dateHelper';

const logo = require("../../../img/logo.png");
export default class TwinPostColumn extends Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        const  post  = this.props.post;
        
        const  navigation  = this.props.navigation;
        return (<View key={post.id} style={styles.postContainerCol}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[0] })}>
                                            <View style={styles.postContentCol}>

                                                 {post.sections[0]!=null && post.sections[0].image!=null? <Image style={styles.postImageCol} source={{ uri: post.sections[0].image}}/>:<Image style={styles.postImageCol} source={logo} />} 

                                                <View style={styles.postInfoCol}>
                                                     <View style={{ flexDirection: 'row' }}>
                                                            <Text style={styles.postDate}>{DateHelper.getLongDate(post.sections[0].date)}</Text>
                                                            <Text style={styles.postMiddleDate} > | </Text>
                                                            <Text style={styles.postDate}>{DateHelper.getView(post.sections[0].date, post.sections[0].id)}</Text>
                                                        </View>
                                                    <Text style={styles.txtPostTitle}>{post.sections[0].title}</Text>
                                                    
                                                </View>

                                            </View>
                                        </TouchableOpacity>
                                        {post.sections[1]!=null ?
                                        (<TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[1] })}>
                                            <View style={styles.postContentCol}>

                                                 {post.sections[1]!=null && post.sections[1].image!=null? <Image style={styles.postImageCol} source={{ uri: post.sections[1].image}}/>:<Image style={styles.postImageCol} source={logo} />} 

                                                <View style={styles.postInfoCol}>
                                                     <View style={{ flexDirection: 'row' }}>
                                                            <Text style={styles.postDate}>{DateHelper.getLongDate(post.sections[1].date)}</Text>
                                                            <Text style={styles.postMiddleDate} > | </Text>
                                                            <Text style={styles.postDate}>{DateHelper.getView(post.sections[1].date, post.sections[1].id)}</Text>
                                                        </View>
                                                    <Text style={styles.txtPostTitle}>{post.sections[1].title}</Text>
                                                    
                                                </View>

                                            </View>
                                        </TouchableOpacity>) :(<View></View>)}

                                    </View>);
    }
}