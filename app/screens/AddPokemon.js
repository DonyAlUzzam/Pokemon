import React, { Component } from 'react'
import { Text, View, StatusBar, Dimensions, FlatList } from 'react-native'
import { Toast, Container, Header, Content, Form, Item, Input, Picker, Label, Icon, Card, Button } from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import MapView from 'react-native-maps';
import {allType, allCategory, addPokemon, getUser} from '../redux/actions'
import { getValue } from '../redux/service/storage/AsyncStorage';
import {connect} from 'react-redux'

const height = Dimensions.get('window').height / 2;

class AddPokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {

            poke: {
                latitude: -6.314892,
                longitude: 106.737981,
                latitudeDelta: 0.0003, // width
                longitudeDelta: 0.0003 // height

            },
            selected2: 1,
            selectedItems: [],
            name: '',
            image: '',
            latitude: '-6.314892',
            longitude: '106.737981',
        };

    }

    // componentDidMount() {
    //     this.props.allCategory()
    //     this.props.allType()
    // }

    componentDidMount() {
      this.props.allCategory()
      this.props.allType()
      this.props.navigation.addListener('didFocus', () => {
          if (this.props.isLoggedIn === false) {
              this.props.navigation.navigate('Login')
          }
          else {
              this.checkToken();
              this.checkToken().then(val => {
               
                  console.log(val);
                  
              });
              
              // console.log(token);
          }
      })
  }

  checkToken = async() => {
    const token = await getValue('token')
    if (token) {
        this.props.getUser(token);
        return 1;
    }else{
        const { type, token } = this.props.token
        const authToken = type + ' ' + token;
        this.props.getUser(authToken);
    }
}

    async newPokemon() {

        const token = await getValue('token')
        if (token) {
            if (this.state.name == '' || this.state.image == '' || this.state.selectedItems.length < 1 || this.state.longitude == '' || this.state.latitude == '' || this.state.selected2 === undefined) {
                alert('Please completed the form and try again.')
            } else { 
                  this.props.addPokemon(this.state.name, this.state.image, this.state.selectedItems, this.state.longitude, this.state.latitude, this.state.selected2, token)
                this.props.navigation.navigate('Home')
                // alert(this.state.selected2)
    
                Toast.show({
                    text: 'New Pokemon added',
                    duration: 1500
                })}
          
           
        }

    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    _onMarkerPress(mkr) {
        // alert(JSON.stringify(mkr.nativeEvent.coordinate));
        this.setState({
            latitude: mkr.nativeEvent.coordinate.latitude,
            longitude: mkr.nativeEvent.coordinate.longitude,
        })
    }
    render() {
        
        // alert(JSON.stringify(this.props.categories))

        return (
            <Container>
                <Content>
                    <StatusBar backgroundColor="white" barStyle="dark-content" />

                    <Form>
                        <Card style={{ margin: "5%", padding: '2%' }}>
                            <Item >
                                <Input placeholder={'Pokemon name'} onChangeText={(text) => this.setState({ name: text })} />
                            </Item>
                            <Item >
                                <Input placeholder={'Image URL'} onChangeText={(text) => this.setState({ image: text })} />
                            </Item>
                            <Item>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    placeholder="Category"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.selected2}
                                    onValueChange={this.onValueChange2.bind(this)}
                                >
                                  {/* <Picker.Item key="1" label="1" value="1" /> */}
                                    {this.props.categories && this.props.categories.map(val => (
                                        <Picker.Item key={val.id} label={val.name} value={val.id} />
                                    ))}

                                    {/* <Picker.Item label='Select Category' value={'ass'} /> */}

                                </Picker>
                            </Item>
                            <Item style={{ flex: 1, }}>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'stretch' }}>

                                    <MultiSelect
                                        hideTags
                                        items={this.props.type}
                                        uniqueKey="id"
                                        ref={(component) => { this.multiSelect = component }}
                                        onSelectedItemsChange={this.onSelectedItemsChange}
                                        selectedItems={this.state.selectedItems}
                                        selectText="Types"
                                        searchInputPlaceholderText="Search Items..."
                                        onChangeInput={(text) => console.log(text)}
                                        altFontFamily="ProximaNova-Light"
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="black"
                                        selectedItemIconColor="black"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{ color: 'black' }}
                                        submitButtonColor="black"
                                        submitButtonText="Submit"
                                    />


                                </View>
                            </Item>
                            <View>

                                {this.multiselect
                                    ?
                                    this.multiselect.getSelectedItemsExt(selectedItems)
                                    :
                                    null}
                            </View>
                        </Card>
                    </Form>
                    <Card>

                        <MapView
                            style={{ width: '100%', height: height }}
                            region={this.state.poke}

                        >
                            <MapView.Marker
                                draggable
                                coordinate={this.state.poke}
                                onDragEnd={this._onMarkerPress.bind(this)}
                            />

                        </MapView>
                    </Card>
                    <Card>
                        <Button block style={{ backgroundColor: '#2980b6' }} onPress={() => this.newPokemon()}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </Button>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
//   alert(JSON.stringify(state.pokemons.categories, null, 2))
  return { 
    isLoading: state.pokemons.isLoading,
    type: state.type.type,
    categories: state.categories.categories,
    user: state.account.user,
    token: state.account.access_token,
    isLoggedIn: state.account.isLoggedIn 
  };
};
 

const mapDispatchToProps = dispatch => ({
  allCategory: () => dispatch(allCategory()),
  allType: () => dispatch(allType()),
  addPokemon: (name, image, type, longitude, latitude, category_id, token) => dispatch(addPokemon(name, image, type, longitude, latitude, category_id, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPokemon)
