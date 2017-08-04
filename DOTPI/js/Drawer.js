import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/home/";
import SideBar from "./components/sidebar";
import CategoryTab from "./components/home/categoryTab";
import Post from "./components/home/post";
import About from "./components/about";
const DrawerNav = DrawerNavigator(
    {
        Home: { screen: Home },
        CategoryTab: { screen: CategoryTab },
        About: { screen: About },
        Post: { screen: Post }
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