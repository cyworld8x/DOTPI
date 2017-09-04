import React, { Component } from "react";

import { ActivityIndicator, StyleSheet, Dimensions,BackHandler,Modal,TouchableOpacity} from 'react-native';
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
const  {height,width} = Dimensions.get('window');
import styles from './styles';
import { connect } from 'react-redux';
import ColorHelper from '../../utilities/colorHelper';
import NotificationHelper from '../../utilities/notificationHelper';
import CategoryTab from "./categoryTab";
import VideoTab from "./videoTab";
class TransitionHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isShowReloading:false,
      isShowPopup:false
    }
     
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({
        isShowPopup:true
      })
      return true;
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
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
        
        NotificationHelper.Notify('Kết nối không thành công!');
        this.props.navigation.navigate('SplashScreen');
      });
  }

  onRefesh(){
    this.loadingData();
  }

  
  render() {       
    return (
      <View style={{flex:1}} >
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
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Icon style={{ color: "#FFF" }} name="md-refresh" />
                </Button>)
              } 
              
            </Right>
          
        </Header>
        {
          this.state.isLoading ? (
              <View style={{ flex: 1,backgroundColor:'#34B089'  }}>
                <Spinner style={{ paddingTop: height / 2 }} color='green' />
              </View>) : 
              (<Tabs renderTabBar={() => <ScrollableTab />}>
                  {this.state.dataSource.map((item) => {
                    
                    if(item.type==null || item.type=="post"){
                        return (

                        <Tab activeTabStyle={{  backgroundColor: '#ffcc33',  }}  textStyle={{color:'#FFF',borderBottomColor:'green'}}
                          tabStyle={{ backgroundColor: ColorHelper.getHexColor(item.id) }} key={item.key} heading={item.name}>
                          <CategoryTab placementid={this.props.Settings!=null && this.props.Settings.FacebookBannerPlacementId !=null?this.props.Settings.FacebookBannerPlacementId :''} 
                          showFacebookAd={this.props.Settings!=null && this.props.Settings.ShowFacebookAd !=null?this.props.Settings.ShowFacebookAd :false}  
                          name={item.name} 
                          navigation={this.props.navigation} url={item.url} categoryid={item.id} />
                        </Tab>
                      );
                    }
                    else{
                      return(
                        <Tab activeTabStyle={{ backgroundColor: '#ffcc33' }} textStyle={{color:'#FFF'}}
                        tabStyle={{ backgroundColor: ColorHelper.getHexColor(item.id+100) }} key={item.key} heading={item.name}>
                          <VideoTab placementid={this.props.Settings != null && this.props.Settings.FacebookBannerPlacementId != null ? this.props.Settings.FacebookBannerPlacementId : ''}
                            showfacebookAd={this.props.Settings!=null && this.props.Settings.ShowFacebookAd !=null?this.props.Settings.ShowFacebookAd :false}  
                            name={'Video'}
                            navigation={this.props.navigation} url={item.url}   />
                        </Tab>
                      )
                    }
                    
                  })}
                  
                </Tabs>)
        }
         
        <Modal style={{ borderRadius:5, flex:1, alignSelf:'center', alignItems:'center', backgroundColor:'black', opacity:0.5}}
					animationType="fade"
          transparent={true}
          visible={true}
					visible={this.state.isShowPopup}
					onRequestClose={() => {this.setState({isShowPopup:false});}}
					>
          <View style={{ position:'absolute', width:width, height:height, backgroundColor: 'black', opacity:0.6, flexDirection:'column',alignSelf:'center'}}>
          </View>
				   <View style={{ borderRadius:5, top:height/2-50, height:160, width:width-20,backgroundColor: '#09aa77', flexDirection:'column',alignSelf:'center'}}>
						<View style={{ width:width, height:40, backgroundColor: '#09aa77', flexDirection: 'row', alignItems:'flex-end' }}>
							
							<View style={{ width:width-60, height:40, backgroundColor: 'black', opacity:0.5, flexDirection: 'column', alignContent:'flex-end' }}>
								<Text style={{textAlign:'center',color:'#FFF', alignSelf:'center', paddingTop:10,fontWeight: '400',fontFamily: 'Avenir'}}>THÔNG BÁO</Text>
							</View>
							<View style={{ width:41, height:40, backgroundColor: 'black', opacity:0.7, alignContent:'center', alignItems:'center' }}>
              <TouchableOpacity onPress={() =>  this.setState({isShowPopup:false})}>
								<Icon name='md-close'  style={{alignSelf:'center', paddingTop:5, color:'#FFF' }} />
							</TouchableOpacity>
							
							</View>
							
						</View>
						<View style={{ flex:1, flexDirection: 'column', alignItems:'center', justifyContent:'center' }}>
                <Text style={{
                    fontFamily: 'Avenir',
                    fontSize: 12,
                    paddingBottom:10,
                    fontStyle: 'italic',
                    color: '#FFF',
                    fontWeight: '400',
                    textShadowColor: '#636664',
                    textShadowRadius: 1,
                    textShadowOffset: { width: 1, height: 1 }
                  }}>Bạn có muốn thoát khỏi ứng dụng?</Text>
                <Button rounded bordered warning style={{ alignSelf: 'center' }} onPress={() => { BackHandler.exitApp() }}>
                  <Text style={{fontFamily: 'Avenir',
                    fontSize: 14}}>Đồng ý</Text>
                </Button>
               
						</View>
				   </View>
           
				  </Modal>
     
      </View>
     
    );
  }
}


function mapStateToProps(state) {
    return { 
	   Settings: state.Settings
    };
}

export default connect(mapStateToProps)(TransitionHome);
