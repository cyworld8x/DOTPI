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
        return (
            <View key={post.id} style={styles.double_post_row_container}>
            <TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[0] })}>
                <View style={styles.double_post_row_view}>
                   
                    <View style={styles.double_post_row_view_thumb} >
                        {post.sections[0] != null && post.sections[0].image != null ? <Image style={styles.double_post_row_view_thumb_image} source={{ uri: post.sections[0].image }} /> : <Image style={styles.block_post_half_width_image} source={logo} />}
                        <View style={styles.double_post_row_view_shadow} >                                                     
                        </View>                                                
                      
                        <View style={styles.double_post_row_view_thumb_view} >  
                            <View style={styles.double_post_row_view_thumb_view_counter} >                                                     
                            </View> 
                            <View style={styles.double_post_row_view_thumb_view_counter_info} >  
                                <View style={styles.double_post_row_view_thumb_view_info}>
                                    <Text style={styles.postDate}>{DateHelper.getLongDateVideo(post.sections[0].date)}</Text>
                                    <Text style={styles.postMiddleDate} > | </Text>
                                    <Text style={styles.postDate}>{DateHelper.getView(post.sections[0].date, post.sections[0].id)}</Text>
                                </View>                                     
                            </View>                                                   
                        </View>
                       
                    </View>
                    
                    <View style={styles.double_post_row_view_thumb_mirror} >
                        <View style={styles.double_post_row_view_thumb_mirror_bottom} >
                            <Text style={styles.txtMediumVideoTitle}>{post.sections[0].title}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
            {post.sections[1] != null ?
                (<TouchableOpacity onPress={() => navigation.navigate('Post', { post: post.sections[1] })}>
                <View style={styles.double_post_row_view}>
                   
                    <View style={styles.double_post_row_view_thumb} >
                        {post.sections[1] != null && post.sections[1].image != null ? <Image style={styles.double_post_row_view_thumb_image} source={{ uri: post.sections[1].image }} /> : <Image style={styles.block_post_half_width_image} source={logo} />}
                        <View style={styles.double_post_row_view_shadow} >                                                     
                        </View>                                                
                       
                        <View style={styles.double_post_row_view_thumb_view} >  
                            <View style={styles.double_post_row_view_thumb_view_counter} >                                                     
                            </View> 
                            <View style={styles.double_post_row_view_thumb_view_counter_info} >  
                                <View style={styles.double_post_row_view_thumb_view_info}>
                                    <Text style={styles.postDate}>{DateHelper.getLongDateVideo(post.sections[1].date)}</Text>
                                    <Text style={styles.postMiddleDate} > | </Text>
                                    <Text style={styles.postDate}>{DateHelper.getView(post.sections[1].date, post.sections[1].id)}</Text>
                                </View>                                     
                            </View>                                                   
                        </View>
                       
                    </View>
                    
                    <View style={styles.double_post_row_view_thumb_mirror} >

                        <View style={styles.double_post_row_view_thumb_mirror_bottom} >
                            <Text style={styles.txtMediumVideoTitle}>{post.sections[1].title}</Text>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>) : (<View></View>)}

        </View>
        );
    }
}