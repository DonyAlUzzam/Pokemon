import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

// import ShoppingCartIcon from './app/components/ShoppingCartIcon'

export default class ProfileScreen extends Component {
  render() {
    return (
      <View>
          <Text>Profile</Text>
      </View>
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
