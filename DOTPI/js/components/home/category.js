import React, { Component } from 'react';
import { Image, Dimensions, WebView, ActivityIndicator, ListView, SectionList,TouchableOpacity, RefreshControl, StyleSheet } from "react-native";

import {
    Container, Header, Title, Content, Button,
    Icon, Left, Right, Body,
    Text, View, Thumbnail,
} from 'native-base';

import styles from './styles';
import CategoryTab from './categoryTab';
import VideoTab from './videoTab';
const deviceWidth = Dimensions.get("window").width;

const logo = require("../../../img/logo.png");

import { connect } from 'react-redux';
class Category extends Component {
    //eslint-disable-line
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        

    }

  
    render() {
        
        return (
            <Container style={{ flex: 1 }} >

                <Header hasTabs style={{ backgroundColor: '#34B089' }}>
                    <Left>
                          <Button
                             transparent
                             onPress={() => this.props.navigation.navigate('DrawerOpen')}
                         >
                             <Icon style={{ color: "#FFF" }} name="menu" />
                         </Button>                      
                    </Left>
                    <Body>
                        <Text  style={{ color: "#FFF", fontWeight:'300' }}>{this.props.navigation.state.params.title}</Text>
                    </Body>
                    <Right >  
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Icon style={{ color: "#FFF" }} name="md-home" />
                        </Button>                      
                       
                     </Right >

                </Header>
                {
                    this.props.navigation.state.params.categorytype ==null || 
                    this.props.navigation.state.params.categorytype =='post'?
                    <CategoryTab placementid={this.props.Settings!=null && this.props.Settings.FacebookBannerPlacementId !=null?this.props.Settings.FacebookBannerPlacementId :''} 
                    showfacebookad={this.props.Settings!=null && this.props.Settings.ShowFacebookAd !=null?this.props.Settings.ShowFacebookAd :false} 
                    navigation={this.props.navigation} url={this.props.navigation.state.params.url}  
                    categoryid={this.props.navigation.state.params.categoryid}  />
                    :
                    
                    <VideoTab placementid={this.props.Settings!=null && this.props.Settings.FacebookBannerPlacementId !=null?this.props.Settings.FacebookBannerPlacementId :''} 
                    showfacebookad={this.props.Settings!=null && this.props.Settings.ShowFacebookAd !=null?this.props.Settings.ShowFacebookAd :false} 
                    navigation={this.props.navigation} url={this.props.navigation.state.params.url}  
                    categoryid={this.props.navigation.state.params.categoryid}  />
                }
                

            </Container>
            
        );
    }

}

function mapStateToProps(state) {
    return { 
      
       Settings: state.Settings
    };
}

export default connect(mapStateToProps)(Category);
