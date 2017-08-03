import React, { Component } from 'react';
import { Image, Dimensions,WebView,ActivityIndicator,ListView,TouchableOpacity ,RefreshControl,StyleSheet } from "react-native";

import { Container,Header,  Title, Content, Button,
  Icon,
  Card,
  CardItem, Text, View, Thumbnail,
  Left,
  Right,
  Body,
  Fab,
  DeckSwiper,
  IconNB } from 'native-base';

import styles from './styles';
import HTMLView from 'react-native-htmlview';

const deviceWidth = Dimensions.get("window").width;

const logo = require("../../../img/logo.png");
const cardImage = require("../../../img/drawer-cover.png");

class CardTab extends Component {
	//eslint-disable-line
	constructor(props) {
       super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            listProducts: ds,
            refreshing: false,
            isLoading: true,
            page: 1
        };
          this.arr = [];
	}
   
	componentDidMount() {
    var url = this.props.url+"/"+this.state.page;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          this.arr = responseJson;
        this.setState({
          isLoading: false,
          listProducts:  this.state.listProducts.cloneWithRows(this.arr),
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  
    
		// return fetch(url)
		// 	.then((response) => response.json())
		// 	.then((responseJson) => {
				
		// 		this.setState({
		// 			isLoading: false,
		// 			dataSource: responseJson,
		// 		}, function () {
		// 			// do something with new state
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
  }
 
  render() {
     if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    
    //    var news = this.state.dataSource.map((item)=>{
        
    //      return (
            
    //       <Card key={item.id}>
    //           <CardItem>
    //            <Image  style={{height: 200, width: 200, flex: 1}}/> 
    //           <Text>{item.title}</Text>
    //           <Text>{item.image}</Text>
    //           </CardItem>
    //       </Card>
         
    //           );
    // });
   
    // return (
    //   <Container>
    //     <View style={{flex:1}}>
    //       {news}
    //     </View>
    //   </Container>
    // );

    
        const {
            container, header, wrapper, backStyle, titleStyle,
            productContainer, productImage, productInfo, lastRowInfo,
            txtName, txtPrice, txtMaterial, txtColor, txtShowDetail
         } = styles;
        const { category } = this.props;
        return (
            <View style={container}>
                <View style={wrapper}>
                    <View style={header}>
                        <TouchableOpacity >
                            <Image  style={backStyle} />
                        </TouchableOpacity>
                        <Text style={titleStyle}>AAAA</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <ListView 
                        removeClippedSubviews={false}
                        dataSource={this.state.listProducts}
                        renderRow={product => (
                            <View style={productContainer}>
                                 <Image style={productImage} source={{ uri: product.image }} /> 
                                <View style={productInfo}>
                                    <Text style={txtName}>{product.name}</Text>
                                    <View style={lastRowInfo}>
                                        <Text style={txtColor}>Colo {product.title}</Text>
                                        <View style={{ backgroundColor: '#fff', height: 16, width: 16, borderRadius: 8 }} />
                                        <TouchableOpacity >
                                            <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        refreshControl={
                            <RefreshControl 
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true, isLoading: false });
                                    const newPage = this.state.page + 1;
                                    this.componentDidMount();
                                }}
                            />
                        }
                    />
                </View>
            </View>
        );
    }
}
export default CardTab;