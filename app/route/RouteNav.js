import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Ionicons";
import IconMaps from "react-native-vector-icons/MaterialCommunityIcons"

import ProfileScreen from '../screens/Profile/ProfileScreen'
import HomeScreen from '../screens/HomeScreen'
import AddPokemon from '../screens/AddPokemon'
import Map from '../screens/Map'

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
   AddPokemon: {
    screen: AddPokemon,
    navigationOptions: {
      headerTitle:'Add New Pokemon',
      tabBarLabel: "AddPokemon",
      tabBarIcon: ({ tintColor }) => (
        <Icons name="md-add" size={30} color={tintColor} />
      )
    }
  },

  Map: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: "Maps",
      tabBarIcon: ({ tintColor }) => (
        <IconMaps name="google-maps" size={30} color={tintColor} />
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



export default createAppContainer(RouteNav);
