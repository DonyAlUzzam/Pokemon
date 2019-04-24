import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";

// import ShoppingCartIcon from './app/components/ShoppingCartIcon'

import RouteNav from "./app/route/RouteNav";
import { createStackNavigator, createAppContainer } from "react-navigation";
import OneSignal from 'react-native-onesignal'; 

import Login from "./app/screens/Login/Login";
import Register from "./app/screens/Register/Register";
import ProfileScreen from "./app/screens/Profile/ProfileScreen";
import Detail from "./app/screens/Detail";

const AppDrawerNavigator = createStackNavigator({
  HomeScreen: {
    screen: RouteNav,
    headerMode: "none",
    navigationOptions: {
      headerTitleStyle: {
        marginLeft: 70,
        color: "white"
      },
      title: "Community Exchange",
      headerStyle: {
        backgroundColor: "#2c3e50"
      },
      headerBackground: (
        <Image
          resizeMode="contain"
          style={{ width: 70, height: 35, top: 10, left: 0 }}
          source={require("./app/assets/icon.png")}
        />
      )
    }
  },
  Register: {
    screen: Register,
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  },
  Detail: {
    screen: Detail,
    headerMode: "none",
    navigationOptions: {
      title: "Title",
      headerLeft: null,
      gesturesEnabled: false,
      headerTitleStyle: {
        marginLeft: 70,
        color: "white"
      },
      title: "Community Exchange",
      headerStyle: {
        backgroundColor: "#2c3e50"
      },
      headerBackground: (
        <Image
          resizeMode="contain"
          style={{ width: 70, height: 35, top: 10, left: 0 }}
          source={require("./app/assets/icon.png")}
        />
      )
    }
  },
  ProfileScreen: {
    screen: ProfileScreen,
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    headerMode: "none",
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(AppDrawerNavigator);



type Props = {};
export default class App extends Component<Props> {

  constructor(properties) {
    super(properties);
    OneSignal.init("11f42788-bda0-4f47-862c-f091a44ddd04");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }


  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
