import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";

// import ShoppingCartIcon from './app/components/ShoppingCartIcon'

import RouteNav from "./app/route/RouteNav";
import { createStackNavigator, createAppContainer } from "react-navigation";
import OneSignal from 'react-native-onesignal'; 

import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import Login from "./app/screens/Login/Login";
import Register from "./app/screens/Register/Register";
import ProfileScreen from "./app/screens/Profile/ProfileScreen";
import Detail from "./app/screens/Detail";
import Questions from './app/screens/PostQuestions'

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

  Questions: {
    screen: Questions,
    headerMode: "",
    navigationOptions: {
      headerTintColor: '#FFF',
      // headerLeft: null,
      // gesturesEnabled: false,
      headerTitleStyle: {
        marginLeft: 0,
        color: "white"
      },
      title: "Post Your Questions",
      headerStyle: {
        backgroundColor: "#2c3e50"
      }
    }
  },

  Detail: {
    screen: Detail,
    headerMode: "",
    navigationOptions: {
     headerTintColor: '#FFF',
      // headerLeft: null,
      // gesturesEnabled: false,
      headerTitleStyle: {
        marginLeft: 0,
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
          // source={require("./app/assets/icon.png")}
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



export default class App extends Component {

  constructor(props) {
    super(props);
    OneSignal.init("d7c17cab-2142-4f1f-921d-95d7a29295c3");

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
    return (
      <Provider store={store}>
      <AppContainer />
    </Provider>
    );
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
