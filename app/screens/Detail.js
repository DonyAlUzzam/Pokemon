import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, Alert, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

import { Text, Picker, Toast } from 'native-base';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'; 
import Icons from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux';
import {getValue} from '../redux/service/storage/AsyncStorage'
import { getDetailPokemon, deleteItem } from '../redux/actions';

class Detail extends Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
       const id = navigation.getParam("id", "");
    
        this.state = {
          id: id,
          readmore: ''
        };
      }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id')
        // alert(id)
        this.setState({id:id})
        this.props.getDetailPokemon(id)
    }

    deleteItem = async(id) => {
        const token = await getValue('token')
        if(token){
            this.props.deleteItem(id, token)
            this.props.navigation.navigate('Home')
            Toast.show({
                text: "Pokemon Deleted",
                duration: 2000
            })
        } 
    }

    confirmationDelete = (id, name) => {
        if (this.props.isLoggedIn){
            Alert.alert(
                'Are you sure to delete Pokemon?', ' pokemon ' + name + ' will be deleted',
                [{
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        this.deleteItem(id);
                    }
                }
            ],
            { cancelable: false},
            );
        } else {
            this.props.navigation.navigate('Login')
        }
    }

    updatePokemon = (id, name, image_url, latitude, longitude, category_id, type) => {
        if (this.props.isLoggedIn) {
            this.props.navigation.navigate('UpdatePokemon', { id, name, image_url, latitude, longitude, category_id, type })
        } else {
            this.props.navigation.navigate('Login')
        }
    }


    render() {
        // alert(JSON.stringify(this.props.readmore, null, 2))
        if (!this.props.readmore || !this.props.readmore.latitude) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
            return (
                <View>
               
                <ScrollView>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', margin: 10}}>
                    <TouchableOpacity 
                    onPress={ () => this.confirmationDelete(this.state.id,this.props.readmore.name)}
                     >
                    <Icons
                        name='trash' style={{ fontSize: 25, color: 'black' }} />
                        
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => this.updatePokemon(this.state.id)} >
                    <Icons
                        name='edit' style={{ fontSize: 25, color: 'black' , paddingLeft: 10}} />
                    </TouchableOpacity>
                </View>
                    <View>
                        <Image resizeMode='center' style={styles.image}
                            source={{ uri: this.props.readmore.image_url }}
                        />
                        <View style={styles.container}>
                        
                            <Text style={styles.name}>{this.props.readmore.name}</Text>
                            <MapView
                                style={{ width: '100%', height: 250 }}
                                region={{
                                    latitude: this.props.readmore.latitude,
                                    longitude: this.props.readmore.longitude,
                                    latitudeDelta: 0.003,
                                    longitudeDelta: 0.003
                                }}
                                showsUserLocation={true}
                            >
                                <MapView.Marker 
                                    title={this.props.readmore.name}
                                    // image={{uri : this.props.readmore.image_url}}
                                    coordinate={{

                                        latitude: this.props.readmore.latitude,
                                        longitude: this.props.readmore.longitude,
                                    }}
                                >
                                <Image source={{ uri: this.props.readmore.image_url }} style={{ width: 40, height: 40 }} /></MapView.Marker>
                                 {/* <Image={{uri : this.props.readmore.image_url}} style={{width:10, height: 10}}></Image></MapView.Marker> */}
                            
                            </MapView>
                          
                        </View>
                    </View>
                </ScrollView>
                </View>
            )
        }
    }
}

const mapStateToProps = state => {
    // alert(state.pokemons.readmore)
    return {
        user: state.account.user,
        token: state.account.access_token,
        isLoggedIn: state.account.isLoggedIn,
        readmore: state.pokemons.readmore
    }
}

const mapDispatchToProps = dispatch => ({
    deleteItem: (id, authToken) => dispatch(deleteItem(id, authToken)),
    getDetailPokemon: (id, authToken) => dispatch(getDetailPokemon(id, authToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
// export default Detail;

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: 200
    },
    container: {
        paddingLeft: 20,
        paddingBottom: 15,
        paddingRight: 20,
        paddingTop: 15
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 10
    },
    address: {
        color: 'grey',
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 5
    }
})

