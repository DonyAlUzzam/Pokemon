import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import ProfileScreen from '../screens/Profile/ProfileScreen'
import HomeScreen from '../screens/HomeScreen'

export const RouteNav = createBottomTabNavigator({
  //   Home: { screen: HomeScreen },
  //   Settings: { screen: SettingsScreen },
  //   Profile: { screen: ProfileScreen },

  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color={tintColor} />
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    HeaderMode: '',
    navigationOptions: {
      title: 'Account',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      tabBarLabel: "Account",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" size={30} color={tintColor} />
      )
    }
  },
});



//export const SignedOut = createAppContainer(SignedOutNavigator);
export default createAppContainer(RouteNav);
