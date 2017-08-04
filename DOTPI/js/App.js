
import React from "react";

import { Platform,StatusBar, Navigator } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import Drawer from "./Drawer";
import Home from "./components/home/";
import About from "./components/about/";
import Post from "./components/home/post";
const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Home:{ screen: Home },
        About:{ screen: About },
        Post:{ screen: Post },
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    });

    
export default () =>
<Root>
    <AppNavigator />
</Root>;