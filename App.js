import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";

// import ShoppingCartIcon from './app/components/ShoppingCartIcon'

import RouteNav from "./app/route/RouteNav";
import { createStackNavigator, createAppContainer } from "react-navigation";

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

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
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
