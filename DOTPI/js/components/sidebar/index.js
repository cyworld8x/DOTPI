import React, { Component } from "react";
import { Image,BackHandler, Platform, ToastAndroid, AlertIOS } from "react-native";
import Share, {ShareSheet} from 'react-native-share';
import Favorite from "./favorite";
import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Title,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";

import styles from "./style";
import StoreManagement from "../../api/storageManagement";
import { Provider } from 'react-redux';
const drawerCover = require("../../../img/drawer-cover.png");

const drawerImage = require("../../../img/logo.png");

const datas = [

	{
		name: "MÓN ĂN NGON",
		route: "Home",
		icon: "home",
		bg: "#48525D",
	},
	{
		name: "DANH SÁCH YÊU THÍCH",
		route: "SavedPosts",
		icon: "bookmarks",
		bg: "#48525D",
	},
	// {
	// 	name: "CÀI ĐẶT",
	// 	route: "NHTypography",
	// 	icon: "settings",
	// 	bg: "#48525D",
	// },
	{
		name: "PHIÊN BẢN",
		route: "Version",
		icon: "md-information-circle",
		bg: "#48525D",
	},
	{
		name: "ĐIỀU KHOẢN SỬ DỤNG",
		route: "TermAndCondition",
		icon: "lock",
		bg: "#48525D",
	},
	{
		name: "THOÁT",
		route: "Exit",
		icon: "md-exit",
		bg: "#48525D",
	},
];

export  default class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	actionHandler(routedata){
		switch(routedata.route){
			case 'Exit': BackHandler.exitApp();break;
			case 'Share': this.onOpenShares(); break;
			default:
				this.props.navigation.navigate(routedata.route); break;

		}

	}
	
	onOpenShares() {
		let shareOptions = {
			title: "Mời bạn cài đặt ứng dụng MÓN ĂN NGON",
			message: "Một ứng dụng tổng hợp nhiều bài viết về các món ăn đa dạng và phong phú",
			url: "http://monanngon.tk",
			subject: "Mời bạn cài đặt ứng dụng MÓN ĂN NGON" //  for email 
		};
		setTimeout(() => {
			if (typeof shareOptions["url"] !== undefined) {
				Clipboard.setString(shareOptions["url"]);
				if (Platform.OS === "android") {
					ToastAndroid.show('copied to clipboard', ToastAndroid.SHORT);
				} else if (Platform.OS === "ios") {
					AlertIOS.alert('copied to clipboard');
				}
			}
		}, 300);
 	
  	}

	render() {
	  
    
		return ( 
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#60c49e", top: -1 }}>
					<Image source={drawerCover} style={styles.drawerCover}>
						<View  style={styles.drawerHeaderCover}>
							<View style={styles.drawerSlidebar}>
								<Image square style={styles.drawerLogoSlidebar} source={drawerImage} />
								<Favorite />
							</View>
							
						</View>
						<List
							dataArray={datas}
							renderRow={data =>
								<ListItem button noBorder onPress={() => this.actionHandler(data)}>
									<Left style={{flexDirection:'row', justifyContent:'flex-start'}}>
										<Icon active name={data.icon} style={{ fontSize: 30, color: "#FFF", width:40 }} />  
										<Title >
											{data.name}
										</Title>
										
									</Left>
									
								</ListItem>}
						/>
					</Image>
				</Content>
			</Container>
		);
	}
}
