import React, { Component } from "react";
import { Image } from "react-native";
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
	{
		name: "MỜI BẠN BÈ",
		route: "Shared",
		icon: "md-person-add",
		bg: "#48525D",
	},
	{
		name: "CÀI ĐẶT",
		route: "NHTypography",
		icon: "settings",
		bg: "#48525D",
	},
	{
		name: "PHIÊN BẢN",
		route: "NHTypography",
		icon: "md-information-circle",
		bg: "#48525D",
	},
	{
		name: "ĐIỀU KHOẢN SỬ DỤNG",
		route: "NHTypography",
		icon: "lock",
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
	
	onOpenShares() {
		let shareOptions = {
			title: "Mời bạn cài đặt ứng dụng MÓN ĂN NGON",
			message: "Một ứng dụng tổng hợp nhiều bài viết về các món ăn đa dạng và phong phú",
			url: "http://dotpi.tk",
			subject: "Mời bạn cài đặt ứng dụng MÓN ĂN NGON" //  for email 
		};
		setTimeout(() => {
			if (typeof shareOptions["url"] !== undefined) {
				Clipboard.setString(shareOptions["url"]);
				if (Platform.OS === "android") {
					ToastAndroid.show('Link copiado al portapapeles', ToastAndroid.SHORT);
				} else if (Platform.OS === "ios") {
					AlertIOS.alert('Link copiado al portapapeles');
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
								<ListItem button noBorder onPress={() => data.route!='Shared'? this.props.navigation.navigate(data.route):this.onOpenShares.bind(this)}>
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
