import React, { Component } from 'react';
import { Text, View, Dimensions, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';

import { Container, Content, Form, Item, Input, Picker, Card, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
import MapView, { Marker } from 'react-native-maps';

import { getValue } from '../redux/service/storage/AsyncStorage';
import { allCategory, allType, updatePokemon, getDetailPokemon } from '../redux/actions/index';

const height = Dimensions.get('window').height / 2;

class UpdatePokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -6.2863757,
                longitude: 106.7284591,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005

            },
            selected2: 1,
            selectedItems: [],
            id: 0,
            name: '',
            image: '',
            latitude: -6.2863757,
            longitude: 106.7284591,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        };

    }

    componentDidMount() {
        this.props.allCategory()
        this.props.allType()
        // this.props.getDetailPokemon(id)
        // const id = this.props.navigation.getParam('id', '');
        // const name = this.props.navigation.getParam('name', '');
        // const image_url = this.props.navigation.getParam('image_url', '');
        // const latitude = this.props.navigation.getParam('latitude', '');
        // const longitude = this.props.navigation.getParam('longitude', '');
        // const category_id = this.props.navigation.getParam('category_id', '');
        // const type = this.props.navigation.getParam('type', '');
        const typeId = [];
        this.props.readmore.type.map(val => {
            typeId.push(val.id)
        })

        this.setState({
            id: this.props.readmore.id,
            name: this.props.readmore.name,
            image: this.props.readmore.image_url,
            selected2: this.props.readmore.category_id,
            selectedItems: typeId,
            latitude: this.props.readmore.latitude,
            longitude: this.props.readmore.longitude
        })
    }

    updatePokemon = async () => {
        const token = await getValue('token');
        // alert(JSON.stringify(token))
        if (token) {
            if (this.state.name == '' || this.state.image == '' || this.state.selectedItems.length < 1 || this.state.latitude == undefined || this.state.longitude == undefined || this.state.selected2 === undefined) {
                alert('Completed the form!')
            } 
                this.props.updatePokemon(token, this.state.id, this.state.name, this.state.image, this.state.latitude, this.state.longitude, this.state.selected2, this.state.selectedItems)
                this.props.navigation.navigate('Home')
                // alert('ok')
           
        }
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    }

    onValueChange(value) {
        this.setState({
            selected2: value
        });
    }

    onMarkerSelect = (event) => {
        // alert(JSON.stringify(event.nativeEvent.coordinate))
        this.setState({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        })
    }

    render() {
       
        // alert(this.state.category_id)
        if (this.props.categories && this.props.categories.length < 0 || this.props.types === undefined) {
            return (
                <View>
                    <ActivityIndicator size="large" style={styles.activityIndicator} />
                </View>
            )
        }
        return (
            <Container>
                <Content>
                    <StatusBar backgroundColor="#49b3e8" barStyle="light-content" />
                    <Form>
                        <Card style={{ margin: '5%', padding: '2%' }}>
                            <Item>
                                <Input placeholder={'Pokemon name'} defaultValue={this.state.name} onChangeText={(text) => { this.setState({ name: text }) }} />
                            </Item>
                            <Item>
                                <Input placeholder={'Image URL'} defaultValue={this.state.image} onChangeText={(text) => this.setState({ image: text })} />
                            </Item>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Category"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange.bind(this)}
                            >

                                {this.props.categories && this.props.categories.map(val => {
                                    return (
                                        <Picker.Item key={val.id} label={val.name} value={val.id} />
                                    )
                                })}

                            </Picker>
                            <Item style={{ flex: 1, }}>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'stretch' }}>
                                    <MultiSelect
                                        hideTags
                                        items={this.props.types}
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
                                        submitButtonColor="#49b3e8"
                                        submitButtonText="Submit"
                                    />
                                </View>
                            </Item>
                            <View>
                                {this.multiselect ? this.multiselect.getSelectedItemsExt(selectedItems) : null}
                            </View>
                        </Card>
                    </Form>
                    <Card>
                        <MapView style={{ width: '100%', height: height }}
                            region={{
                                latitude: this.props.readmore.latitude,
                                longitude: this.props.readmore.longitude,
                                latitudeDelta: this.state.latitudeDelta,
                                longitudeDelta: this.state.longitudeDelta
                            }}>
                            <Marker
                                draggable
                                coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                                onDragEnd={this.onMarkerSelect.bind(this)}
                            />
                        </MapView>
                    </Card>
                    <Card>
                        <Button block style={{ backgroundColor: '#49b3e8' }} onPress={() => this.updatePokemon()}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>Save</Text>
                        </Button>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    // alert(JSON.stringify(state.pokemons.pokemons, null, 2))
    return {
        readmore: state.pokemons.readmore,
        types: state.type.type,
        categories: state.categories.categories,
        user: state.account.user,
        token: state.account.access_token,
        isLoggedIn: state.account.isLoggedIn 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailPokemon:(id, authToken) => dispatch(getDetailPokemon(id, authToken)),
        allCategory: () => dispatch(allCategory()),
        allType: () => dispatch(allType()),
        updatePokemon: (authToken, id, name, image_url, latitude, longitude, category_id, type) => {
            dispatch(updatePokemon(authToken, id, name, image_url, latitude, longitude, category_id, type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePokemon);

const styles = StyleSheet.create({
    activityIndicator: {
        color: '#0000ff'
    }
})
