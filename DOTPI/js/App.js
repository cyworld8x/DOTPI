
import React from "react";

import { Platform,StatusBar, Navigator } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import Drawer from "./Drawer";
import Home from "./components/home/";
import About from "./components/about/";
import Post from "./components/home/post";

import ClonePost from "./components/home/clonePost";
import SavedPosts from "./components/home/savedPosts";
import ListPosts from "./components/home/listPosts";
import Category from "./components/home/category";
const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Home:{ screen: Home },
        About:{ screen: About },
        Post:{ screen: Post },
        ClonePost:{ screen: ClonePost },
        SavedPosts:{ screen: SavedPosts },
        ListPosts:{screen:ListPosts},
        Category:{screen:Category}
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    });

    
export default () =>
<Root>
    <AppNavigator />
</Root>;