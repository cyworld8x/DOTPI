import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/home/";
import SideBar from "./components/sidebar";
import CardTab from "./components/home/cardTab";
const DrawerNav = DrawerNavigator(
    {
        Home: { screen: Home },
         CardTab: { screen: CardTab }
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

export default DrawerNav;