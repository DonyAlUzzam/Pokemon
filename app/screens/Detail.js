import React, { Component } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Footer,
  Body,
  Input,
  Left,
  FooterTab,
  Right
} from "native-base";
import { stringToRupiah } from "../helper/currency";
import { getValue } from "../redux/service/storage/AsyncStorage";
import { getDetail, addToCart } from "../redux/actions";
import { connect } from "react-redux";

import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { BASE_URL, PIC_URL } from "react-native-dotenv";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const data = navigation.getParam("data", "");

    this.state = {
      data: data
    };
  }

  // componentDidMount() {

  //     this.props.navigation.addListener('didFocus', ()=>{
  //         this.props.getDetail(this.state.id)
  //     })
  // }

  // componentDidMount() {
  //     const id = this.props.navigation.getParam('id', '');
  //         this.props.getDetail(id)
  // }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text style={styles.textProduct}>
                {" "}
                {this.state.data.itemTitle}
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>{this.state.data.itemName}</Text>
            </CardItem>
            <CardItem>
              <Text>{this.state.data.itemCreator}</Text>
            </CardItem>
            </Card>
            <Card >
            <CardItem
              style={{ borderBottomColor: "#dee0e2", borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: "bold", paddingLeft: 15}}>
               1 Answer
              </Text>
            </CardItem>
          </Card>
          <Card >
            <CardItem
              style={{ borderBottomColor: "#dee0e2", borderBottomWidth: 1 }}>
              <Text style={{ alignSelf:'flex-end'}}>
             Telephone Kaleng dan lonceng besi
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  footerButtonMain: {
    backgroundColor: "#3a455c",
    marginLeft: 4,
    marginRight: 4,
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 350,
    width: null,
    flex: 1
  },
  textProduct: {
    fontWeight: "bold",
    fontSize: 22
  },
  footerStyle: {
    backgroundColor: "#3a455c",
    paddingBottom: 5,
    flexDirection: "row",

    paddingTop: 5
  },
  textImage: {
    fontWeight: "bold",
    color: "#44dd44",
    fontSize: 18
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    color: "#ffffff"
  }
});
