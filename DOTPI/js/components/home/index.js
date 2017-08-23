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
  Content

} from "native-base";
const  {height} = Dimensions.get('window');
import styles from './styles';
import CategoryTab from "./categoryTab";
import ListPosts from "./listPosts";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  // eslint-disable-line
  componentDidMount() {
    return fetch('http://api.dotpi.tk/category')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getHexColor(id) {
    return '#' + ('000000' + Math.floor(id * 1000).toString(16)).slice(-6);
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
   
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
              <Title style={{ color: "#FFF" }}>MÓN ĂN NGON</Title>
            </Body>
            <Right/>
          
        </Header>
         <Tabs renderTabBar={() => <ScrollableTab />}>
          {this.state.dataSource.map((item) => {
            return (

              <Tab activeTabStyle={{ backgroundColor: '#ffcc33' }} 
              tabStyle={{ backgroundColor: this.getHexColor(item.id)}} key={item.id*item.id/100} heading={item.name}>
                <CategoryTab name={item.name} navigation={this.props.navigation} url={item.url} categoryid={item.id} />
              </Tab>
            );
          })}
        </Tabs> 
         
     
      </View>
     
    );
  }
}

export default Home;
