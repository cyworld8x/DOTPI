
import React from "react";

import { Platform,StatusBar, Navigator } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import Drawer from "./Drawer";
import SplashScreen from "./components/splash";
import Home from "./components/home/";
import TransitionHome from "./components/home/home";
import About from "./components/about/";
import Post from "./components/home/post";
import Search from "./components/home/search";
import ClonePost from "./components/home/clonePost";
import SavedPosts from "./components/home/savedPosts";
import Category from "./components/home/category";
import TermAndCondition from "./components/home/termandcondition";
import Version from "./components/splash/version";
const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        SplashScreen:{screen: SplashScreen},
        Home:{ screen: Home },
        TransitionHome:{ screen: TransitionHome },
        Search:{screen: Search },
        About:{ screen: About },
        Post:{ screen: Post },
        ClonePost:{ screen: ClonePost },
        SavedPosts:{ screen: SavedPosts },
        Category:{screen:Category},
        TermAndCondition:{screen:TermAndCondition},
        Version:{screen:Version}
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    });

    
export default () =>
<Root>
    <AppNavigator />
</Root>;