import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import { Container, Button, H3, Text, Header, Title, Body, Left, Right } from "native-base";

import styles from "./styles";
import { connect } from 'react-redux';
import { loadingConfiguration } from '../../api/actionCreators';
const launchscreenBg = require("../../../img/launchscreen-bg.png");
const launchscreenLogo = require("../../../img/unnamed.png");
import StoragePosts from '../../api/storagePosts';
import Home from '../../components/home';
class SplashScreen extends Component {
	// eslint-disable-line
    constructor(props){
		super(props);
		this.state= {
			isLoading:true
		};
		
	}
	componentDidMount() {
		
		StoragePosts.getPosts().then((data)=> {
			let posts = JSON.parse(data);
			posts = posts!=null? posts:[];
			
			
			this.props.loadingConfiguration(posts);
			//console.error(posts);
			this.setState({
				isLoading: false
			})

		})
	}
	render() {
		if(this.state.isLoading){
			return (
				<Container>
					<StatusBar barStyle="light-content" />
					<Image source={launchscreenBg} style={styles.imageContainer}>
						<View style={styles.logoContainer}>
							<Image source={launchscreenLogo} style={styles.logo} />
						</View>
						<View
							style={{
								alignItems: "center",
								marginBottom: 50,
								backgroundColor: "transparent",
							}}
						>
							<H3 style={styles.text}>App to showcase</H3>
							<View style={{ marginTop: 8 }} />
							<H3 style={styles.text}>NativeBase components</H3>
							<View style={{ marginTop: 8 }} />
						</View>
						<View style={{ marginBottom: 80 }}>
							<Button
								style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
								onPress={() => this.props.navigation.navigate("DrawerOpen")}
							>
								<Text>Lets Go!</Text>
							</Button>
						</View>
					</Image>
				</Container>
			);
		}
		else{
			return (<Home navigation={this.props.navigation} />);
		}
		
	}
}

function mapStateToProps(state) {
    return { 
       FavoritedPosts: state.Storage.FavoritedPosts
    };
}

export default connect(mapStateToProps,{ loadingConfiguration })(SplashScreen);
