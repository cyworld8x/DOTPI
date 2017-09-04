import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/home/";
import TransitionHome from "./components/home/home";
import SideBar from "./components/sidebar";
import CategoryTab from "./components/home/categoryTab";
import Post from "./components/home/post";
import ClonePost from "./components/home/clonePost";
import About from "./components/about";
import SavedPosts from "./components/home/savedPosts";
import Category from "./components/home/category";
import SplashScreen from "./components/splash";
import TermAndCondition from "./components/home/termandcondition";
import Version from "./components/splash/version";
import Search from "./components/home/search";
import Youtube from "./components/home/youtube";
import PromotionPage from "./components/home/promotionPage";
const DrawerNav = DrawerNavigator(
    {
        Home: { screen: Home },
         TransitionHome:{ screen: TransitionHome },
        SplashScreen: { screen: SplashScreen },
        CategoryTab: { screen: CategoryTab },
        About: { screen: About },
        Post: { screen: Post },
        ClonePost: { screen: ClonePost },
        SavedPosts:{ screen: SavedPosts },
        Category:{ screen: Category },
        TermAndCondition:{screen:TermAndCondition},
        Version:{screen:Version},
        Search:{screen:Search},
        Youtube:{screen:Youtube},
        PromotionPage:{screen:PromotionPage}
    },
    {
        initialRouteName: "SplashScreen",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

export default DrawerNav;