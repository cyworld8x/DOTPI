import React, { Component } from "react";

import { ActivityIndicator,StyleSheet} from 'react-native';
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

import styles from './styles';
import CardTab from "./cardTab";

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
        return '#'+ ('000000' + Math.floor(id*1000).toString(16)).slice(-6);
    }
  render() {
     if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    var components = ('');
    var components = this.state.dataSource.map((item)=>{    
        return(
       
          <Tab key={item.id} heading={<TabHeading tabStyle={{color: this.getHexColor(item.id),backgroundColor: this.getHexColor(item.id)}}><Text>{item.name}</Text></TabHeading>}>
            <CardTab url={item.url} />
            {/* <Text>{item.url}</Text> */}
          </Tab>
);
   });
    return (
      <Container style={{backgroundColor:'#FFF'}} >
        <Header style={{backgroundColor:'#FFF'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={{color:"#000"}} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={{color:"#000"}>DOTPI</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
         
           {components} 
        </Tabs>
        </Content>
          <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button active>
              <Icon active name="navigate" />
            </Button>
            <Button>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
       
      </Container>
    );
  }
}

export default Home;
