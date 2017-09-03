import React, { Component } from "react";

import { ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import {
 
  View,
  Text

} from "native-base";
import styles from './styles';
import { InterstitialAdManager } from 'react-native-fbads';
import DateHelper from '../../utilities/dateHelper';
import { BannerView } from 'react-native-fbads';
const logo = require("../../../img/logo.png");
export default class SinglePost extends Component{
    constructor(props)
    {
        super(props);
        
    }

    render(){
        const  post  = this.props.post;
        
        const  navigation  = this.props.navigation;
        return (<View key={post.id} style={styles.single_post_container}>
            <View style={styles.single_post_view}>
                <TouchableOpacity onPress={() => navigation.navigate('Post', { post: post })}>
                    {post != null && post.image != null ? <Image style={styles.postImageFullRow} source={{ uri: post.image }} /> : <Image style={styles.postImageFullRow} source={logo} />}
                    <View style={styles.single_post_views}>
                        <Text style={styles.single_post_text_view}>{DateHelper.getView(post.date, post.id)}</Text>
                    </View>
                    <View style={styles.single_post_info_shadow}>
                        <View style={styles.single_post_info_shadow_date}>


                        </View>

                        <View style={styles.single_post_info_shadow_title}>


                        </View>
                    </View>

                    <View style={styles.single_post_info}>
                        <View style={styles.single_post_info_date}>
                            <Text style={styles.single_post_text_date}>{DateHelper.getLongDate(post.date)}</Text>

                        </View>
                        <View style={styles.single_post_info_title}>
                            <Text style={styles.single_post_text_title}>{post.title}</Text>

                        </View>

                    </View>
                </TouchableOpacity>


            </View>
            {this.props.placementid.length>0 && !__DEV__
                        &&
                        <BannerView style={styles.bannerFullRow}
                        placementId={this.props.placementid}
                        type="standard"
                        onPress={() => console.log('click')}
                        onError={(err) => {}}
                    />}
        </View>);
    }
}