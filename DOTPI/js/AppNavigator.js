import React, { Component } from "react";
import { BackAndroid, StatusBar, Platform, DeviceEventEmitter } from "react-native";
import { variables, Drawer } from "native-base";

import Home from "./components/home/";
import SplashScreen from "./components/splash";

import Post from "./components/home/post";

import ClonePost from "./components/home/clonePost";
import About from "./components/about/";
import SavedPosts from "./components/home/savedPosts";
import ListPosts from "./components/home/listPosts";
import Category from "./components/home/category";
//import PushNotification from 'react-native-push-notification';
//import {DeviceEventEmitter} from 'react-native';
 
// (function(navigation) {
//   // Register all the valid actions for notifications here and add the action handler for each action
//   PushNotification.registerNotificationActions(['Accept','Reject','Yes','No', 'Xem', null]);
//   DeviceEventEmitter.addListener('notificationActionReceived', function(action){
    
//     const info = JSON.parse(action.dataJSON);
//     console.error (navigation);
//     if (info.action == 'Accept') {
//         action.navigation.navigate(action.routeName, action.post);
//       // Do work pertaining to Accept action here
//     } else if (info.action == 'Reject') {
//       // Do work pertaining to Reject action here
//     }
//     // Add all the required actions handlers
//   });
// })();

//import PushNotificationHandler from './api/pushNotificationHander';

class AppNavigator extends Component {
  render() {
    
    return ;
  }
}

export default AppNavigator;