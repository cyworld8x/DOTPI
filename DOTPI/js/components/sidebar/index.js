import React, { Component } from "react";
import { Image } from "react-native";

import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
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

const drawerCover = require("../../../img/drawer-cover.png");

const drawerImage = require("../../../img/unnamed.png");

const datas = [

	{
		name: "Home",
		route: "Home",
		icon: "person",
		bg: "#48525D",
	},
	{
		name: "TIN ĐÃ LƯU",
		route: "SavedPosts",
		icon: "person",
		bg: "#48525D",
	},
	
	{
		name: "Cài đặt",
		route: "NHTypography",
		icon: "settings",
		bg: "#48525D",
	},
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#60c49e", top: -1 }}>
					<Image source={drawerCover} style={styles.drawerCover}>
					<View  style={styles.drawerHeaderCover}>
						<Image square style={styles.drawerImage} source={drawerImage} />
						<Right style={styles.drawerProfile}>
									
									<Button iconLeft rounded success
												>
												  <Icon name='home' />
											<Text style={styles.text}>
										
										</Text>
										
										</Button>
								</Right>
					</View>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left style={{flexDirection:'row', justifyContent:'flex-start'}}>
									<Icon active name={data.icon} style={{ fontSize: 30, color: "#FFF", width:40 }} />  
									<Text style={styles.textSlideBar}>
										{data.name}
									</Text>
									
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
					</Image>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
