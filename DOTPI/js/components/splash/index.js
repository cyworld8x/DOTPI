import React, { Component } from "react";
import { Image, View, StatusBar } from "react-native";

import { Container, Button, H3, Text, Header, Title } from "native-base";
import PushNotification from 'react-native-push-notification';
import styles from "./styles";
import { connect } from 'react-redux';
import { loadingDataStorage, saveSettings } from '../../api/actionCreators';

const launchscreenLogo = require("../../../img/version.png");
import StoragePosts from '../../api/storagePosts';
import Home from '../../components/home';
class SplashScreen extends Component {
	// eslint-disable-line
    constructor(props){
		super(props);
		this.state= {
			isLoadingDataStorage:true,
			isLoadingSetting:true
		};
	}
	componentDidMount() {
		try {
			let notificationId = 9999;
			PushNotification.cancelLocalNotifications({ id: notificationId });
			PushNotification.localNotificationSchedule({
				id: notificationId,
				message: "Bạn ơi! Có nhiều bài mới đang chờ bạn khám phá!", // (required) 
				date: new Date(Date.now() + (60 * 60 * 24 * 1000)) // in 60 secs 
			});

		}
		catch (error) {

		}
		
		StoragePosts.getPosts().then((data)=> {
			let posts = JSON.parse(data);
			posts = posts!=null? posts:[];
			
			
			this.props.loadingDataStorage(posts);
			this.setState({
				isLoadingDataStorage: false
			});		

		});

		fetch('http://api.dotpi.tk/configuration')
			.then((response) => response.json())
			.then((responseJson) => {

				if (responseJson != null) {
					
					StoragePosts.saveSettings(responseJson);
					this.props.saveSettings(responseJson)
					setTimeout(() => {
						this.setState({
							isLoadingSetting: false
						});
					}, 1000);

				}

			})
			.catch((error) => {
				console.error(error);
			});
	}
	render() {
		if(this.state.isLoading || this.state.isLoadingSetting){
			return (
				<Container style={{backgroundColor:'#34B089'}}> 
					<StatusBar barStyle="light-content" />
					<View style={{flex: 1,backgroundColor:'#34B089'}}>
						<View style={styles.logoContainer}>
							<Image source={launchscreenLogo} style={styles.logo} />
						</View>
						
					</View>
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
	   FavoritedPosts: state.Storage.FavoritedPosts,
	   Settings: state.Settings
    };
}

export default connect(mapStateToProps,{ loadingDataStorage, saveSettings })(SplashScreen);
