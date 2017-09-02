import React, { Component } from "react";

import { ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import {
  Icon,
  View,
  Text

} from "native-base";
import styles from './styles';
import DateHelper from '../../utilities/dateHelper';

const logo = require("../../../img/logo.png");
export default class TwinPostRow extends Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        const  post  = this.props.post;
        
        const  navigation  = this.props.navigation;
        return (<View key={post.id} style={styles.double_post_column_container}>
                                            <TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[0] })}>
                                                <View style={styles.double_post_column_view}>
                                                    <View style={styles.double_post_column_view_thumb}>
                                                        {post.sections[0]!=null && post.sections[0].image!=null? <Image style={styles.double_post_column_view_image} source={{ uri: post.sections[0].image}}/>:<Image style={styles.double_post_column_view_image} source={logo} />} 
                                                    
                                                        <View style={styles.double_post_column_view_thumb_shadow_bottom}>
                                                        
                                                        </View>
                                                        <View style={styles.double_post_column_view_thumb_bottom_title}>
                                                            <Text style={styles.double_post_column_text_title}>{post.sections[0].title}</Text>
                                                        </View>
                                                    </View>
                                                    
                                                    <View style={styles.double_post_column_view_info}>
                                                        
                                                        <View style={styles.double_post_column_view_info_view}>
                                                            <Icon style={{ color: '#FFF', flex:1 }} fontSize="8" name='md-eye' />
                                                            <Text style={styles.double_post_column_text_view}>{DateHelper.getView(post.sections[0].date, post.sections[0].id)}</Text>
                                                        </View>
                                                        <View style={styles.double_post_column_view_info_title}> 
                                                            <Text style={styles.double_post_column_text_view}>{DateHelper.getLongDateVideo(post.sections[0].date)}</Text>
                                                        </View>                                                       
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                            {post.sections[1]!=null ?<TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[1] })}>
                                            <View style={styles.double_post_column_view}>
                                                <View style={styles.double_post_column_view_thumb}>
                                                    {post.sections[0]!=null && post.sections[1].image!=null? <Image style={styles.double_post_column_view_image} source={{ uri: post.sections[1].image}}/>:<Image style={styles.double_post_column_view_image} source={logo} />} 
                                                
                                                    <View style={styles.double_post_column_view_thumb_shadow_top}>
                                                    
                                                    </View>
                                                    <View style={styles.double_post_column_view_thumb_top_title}>
                                                        <Text style={styles.double_post_column_text_title}>{post.sections[1].title}</Text>
                                                    </View>
                                                </View>
                                                
                                                <View style={styles.double_post_column_view_info}>
                                                    <View style={styles.double_post_column_view_info_title}> 
                                                        <Text style={styles.double_post_column_text_view}>{DateHelper.getLongDateVideo(post.sections[1].date)}</Text>
                                                    </View> 
                                                    <View style={styles.double_post_column_view_info_view}>
                                                        <Icon style={{ color: '#FFF', flex:1 }} fontSize="8" name='md-eye' />
                                                        <Text style={styles.double_post_column_text_view}>{DateHelper.getView(post.sections[1].date, post.sections[1].id)}</Text>
                                                    </View>
                                                                                                          
                                                </View>

                                            </View>
                                        </TouchableOpacity>:<View></View>}

                                        </View>)
    }
}