import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image
} from "react-native";
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  Card,
  CardItem,
  Right,
  List
} from "native-base";

import { requestCameraPermission } from "../components/Permission";
import { getAllPokemon } from "../redux/actions";
import { connect } from "react-redux";
import Pokemon from "../components/Pokemon";

class HomeScreen extends Component {
  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgorundColor: "#000" }} />
    );
  };

  async componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.props.getAllPokemon();
    });
    await requestCameraPermission();
  }

  render() {
    // alert(JSON.stringify(this.props.pokemons, null, 2));
    if (!this.props.pokemons) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
    
      return (
        <Container>
          <Content>
            <FlatList
              data={this.props.pokemons}
              renderItem={({ item }) => (
                <Pokemon
                  // _onPress={this._onPress}
                  itemImage={item.image_url}
                  itemName={item.name}
                  itemCategory={item.category.name}
                  itemType={item.type.map((type) => {
                    return type.name+ " " ;
                  })}
                  getDetails={() => {
                    this.props.navigation.navigate("Detail", {
                      id: item.id
                    });
                  }}
                />
              )}
              numColumns={1}
            />
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log("---->", state.pokemons);
  return { pokemons: state.pokemons.pokemons };
};

const mapDispatchToProps = dispatch => ({
  getAllPokemon: () => dispatch(getAllPokemon())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  view: {
    margin: 0
  },
  image: {
    height: 100,
    width: 90
  },
  content: {
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-start",
    height: 90,
    paddingHorizontal: 20,
    marginTop: 1
  },
  title: {
    color: "#49b3e8",
    fontSize: 17,
    fontWeight: "bold"
  },
  contentAddress: {
    color: "grey",
    fontSize: 12
  }
});
