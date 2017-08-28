import React, { Component } from "react";
import { Image, View, StatusBar,NetInfo,ProgressBar } from "react-native";

import { Container, Button, H3, Text, Header, Title,Spinner } from "native-base";
import PushNotification from 'react-native-push-notification';
import styles from "./styles";
import { connect } from 'react-redux';
import { loadingDataStorage, saveSettings } from '../../api/actionCreators';

const launchscreenLogo = require("../../../img/version.png");
import StoragePosts from '../../api/storagePosts';
import Home from '../../components/home';
import NetInfoHelper from '../../utilities/netInfoHelper'
import NotificationHelper from '../../utilities/notificationHelper'
class SplashScreen extends Component {
	// eslint-disable-line
    constructor(props){
		super(props);
		this.state= {
			isLoadingDataStorage:true,
			isLoadingSetting:true,
			networkError:false
		};
		this.loadingServerSettings = this.loadingServerSettings.bind(this);
	}
	componentDidMount() {
		try {
			let notificationId = 9999;
			PushNotification.cancelLocalNotifications({ id: notificationId });
			PushNotification.localNotificationSchedule({
				id: notificationId,
				message: "Bạn ơi! Có nhiều bài mới đang chờ bạn khám phá!", // (required) 
				date: new Date(Date.now()+60*60*1000*24) // in 60 secs 
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

		this.loadingServerSettings();
		
	}

	loadingServerSettings()
	{
		StoragePosts.loadingSettings().then((settings)=> {
			
			if(settings==null){
				settings = {
					ApiUrl : 'http://api.dotpi.tk',
					WebsiteUrl : 'http://dotpi.tk'
				}
			}
			if(settings.ApiUrl==null){
				settings.ApiUrl = 'http://api.dotpi.tk';
			}
			if(settings.WebsiteUrl==null){
				settings.WebsiteUrl = 'http://dotpi.tk';
			}
			fetch(settings.ApiUrl+ '/configuration')
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
						this.setState({
							networkError: true
						})
						NotificationHelper.Notify('Vui lòng bật kết nối mạng');
					});	

		});
	}
	render() {
		if(this.state.isLoading || this.state.isLoadingSetting){
			return (
				<Container style={{backgroundColor:'#34B089'}}> 
					<StatusBar barStyle="light-content" />
					<View style={{flex: 1, flexDirection:'column'}}>
						<View style={styles.logoContainer}>
							<Image source={launchscreenLogo} style={styles.logo} />
						</View>
						{this.state.isLoadingSetting && !this.state.networkError && 
							<View style={ styles.info }>
								
								<Spinner color='#FFF' />
								<Text style={{color:'#FFF'}}>Đang kiểm tra kết nối internet</Text>
							</View>}
							{this.state.networkError &&
							<View style={ styles.info }>
								<Text style={{color:'#FFF', paddingVertical:10}}>Bạn đã bật kết nối internet?</Text>
								<View style={{flex:1, flexDirection:'column'}}>
								<Button rounded bordered warning onPress={()=>{ this.setState({networkError:false}); this.loadingServerSettings()}}>
									<Text>Thử lại</Text>
								</Button>
								</View>
							</View>}
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
