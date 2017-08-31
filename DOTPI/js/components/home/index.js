import React, { Component } from "react";

import { ActivityIndicator, StyleSheet, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  ScrollableTab,
  Tab,
  View,
  Text,
  Right,
  Left,
  Body,
  TabHeading,
  Footer,
  FooterTab,
  Content,
  Spinner

} from "native-base";
const  {height} = Dimensions.get('window');

import styles from './styles';
import { connect } from 'react-redux';
import ColorHelper from '../../utilities/colorHelper';
import NotificationHelper from '../../utilities/notificationHelper';
import CategoryTab from "./categoryTab";
import VideoTab from "./videoTab";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isShowReloading:false
    }
     
  }
  // eslint-disable-line
  componentDidMount() {
     this.loadingData();
    
  }

  loadingData(){
    
      var url = this.props.Settings.ApiUrl +'/category'
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          isShowReloading:true,
          dataSource: responseJson,
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
        NotificationHelper.Notify('Kết nối không thành công!');
        this.props.navigation.navigate('SplashScreen');
      });
  }

  onRefesh(){
    this.loadingData();
  }

  
  render() {       
    return (
      <View style={{flex:1,backgroundColor: '#34B089'}} >
        <Header  hasTabs style={{ backgroundColor: '#34B089' }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={{ color: "#FFF" }} name="menu" />
            </Button>
          </Left>
            <Body>
              <Text style={{ color: "#FFF", fontWeight:'300' }}>MÓN ĂN NGON</Text>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("Search")}
              >
                <Icon style={{ color: "#FFF" }} name="md-search" />
              </Button>
               {
                this.state.isShowReloading && (<Button
                  transparent
                  onPress={() => this.props.navigation.navigate("TransitionHome")}
                >
                  <Icon style={{ color: "#FFF" }} name="md-refresh" />
                </Button>)
              } 
              
            </Right>
          
        </Header>
        {
          this.state.isLoading ? (
              <View style={{ flex: 1,backgroundColor: "#FFF"  }}>
                <Spinner style={{ paddingTop: height / 2 }} color='green' />
              </View>) : 
              (<Tabs renderTabBar={() => <ScrollableTab />}>
                  {this.state.dataSource.map((item) => {
                    return (

                      <Tab activeTabStyle={{ backgroundColor: '#ffcc33' }}  textStyle={{color:'#FFF'}}
                        tabStyle={{ backgroundColor: ColorHelper.getHexColor(item.id) }} key={item.id * item.id / 100} heading={item.name}>
                        <CategoryTab placementid={this.props.Settings!=null && this.props.Settings.FacebookBannerPlacementId !=null?this.props.Settings.FacebookBannerPlacementId :''}  
                        name={item.name} 
                        navigation={this.props.navigation} url={item.url} categoryid={item.id} />
                      </Tab>
                    );
                  })}
                  <Tab activeTabStyle={{ backgroundColor: '#ffcc33' }} textStyle={{ color: '#FFF' }}
                    tabStyle={{ backgroundColor: '#a2d246' }} key='video' heading={'Video'}>
                    <VideoTab placementid={this.props.Settings != null && this.props.Settings.FacebookBannerPlacementId != null ? this.props.Settings.FacebookBannerPlacementId : ''}
                      name={'Video'}
                      navigation={this.props.navigation}  />
                  </Tab>
                </Tabs>)
        }
         
         
     
      </View>
     
    );
  }
}


function mapStateToProps(state) {
    return { 
	   Settings: state.Settings
    };
}

export default connect(mapStateToProps)(Home);
