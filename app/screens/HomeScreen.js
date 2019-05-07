import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput
} from "react-native";
import {
  Container,
  Content
} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';

import { requestCameraPermission } from "../components/Permission";
import { getAllPokemon, searchPokemon } from "../redux/actions";
import { connect } from "react-redux";
import Pokemon from "../components/Pokemon";

class HomeScreen extends Component {
  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgorundColor: "#000" }} />
    );
  };

  async componentDidMount() {
    // this.props.navigation.addListener("didFocus", () => {
      this.props.getAllPokemon(1);
    // });
    await requestCameraPermission();
  }

 search = (text) => {
  // alert(JSON.stringify(text))
   this.props.searchPokemon(text)
 }

  loadMore = () => {
    this.props.getAllPokemon(this.props.page + 1)
}

  render() {
    // alert(JSON.stringify(this.props.pokemons))
    if (!this.props.pokemons) {
      return (
        <View>
          <ActivityIndicator size='large' style={styles.activityIndicator} />
        </View>
      );
    } else {
      //  alert(JSON.stringify(this.props.pokemons))
      return (
        <Container style={{ flex: 1}}>
          <View style={{height: 80, backgroundColor: '#c45653', justifyContent: 'center', paddingHorizontal: 5}}>
            <View style={{height: 50, backgroundColor: 'white', flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
              <Icon name='ios-search' style={{fontSize: 26}}/>
            <TextInput placeholder='search' style={{fontSize: 17, marginLeft:15}}
           returnKeyType="go"
           onChangeText={(text) => this.search(text)}
            />
            </View>
          </View>
                    {this.props.pokemons && <FlatList
              data={this.props.pokemons}
              
              renderItem={({ item }) => {
                return(
                <Pokemon
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
              )}}
              onEndReached={this.loadMore}
              onEndReachedThreshold={0.5}
              numColumns={1}
            />}
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  // alert(JSON.stringify(state.pokemons.pokemons, null, 1));
  return { pokemons: state.pokemons.pokemons,
          page: state.pokemons.page
  };
};

const mapDispatchToProps = dispatch => ({
  getAllPokemon: (page) => dispatch(getAllPokemon(page)),
  searchPokemon: (text) => dispatch(searchPokemon(text))
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
  activityIndicator: {
    color: '#0000ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
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

