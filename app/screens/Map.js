import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { getMapsPokemon } from '../redux/actions';

const { height, width } = Dimensions.get('window');

class Maps extends Component {
    componentDidMount() {
        this.props.getMapsPokemon()
    }

    render() {
        if (!this.props.mapsPokemon || this.props.mapsPokemon.length < 1)
            return (
                <View>
                    <ActivityIndicator size="large" style={styles.activityIndicator} />
                </View>
            )
        return (
          
            <View>
                <MapView style={{ width: '100%', height: height }}
                    showsUserLocation={true}
                    region={{
                        latitude: -6.2863757,
                        longitude: 106.7284591,
                        latitudeDelta: 0.120,
                        longitudeDelta: 0.0001200
                    }}>
                    {this.props.mapsPokemon.map(pokemons => {
                        return (<Marker
                            key={pokemons.id}
                            coordinate={{ latitude: pokemons.latitude, longitude: pokemons.longitude }}
                            title={pokemons.name}
                            onPress={() => this.props.navigation.navigate('Detail', {
                                id: pokemons.id
                            })}
                        ><Image source={{ uri: pokemons.image_url }} style={{ width: 40, height: 40 }} />
                        </Marker>)
                    })}
                </MapView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    mapsPokemon: state.pokemons.mapsPokemon
})

const mapDispatchToProps = dispatch => ({
  getMapsPokemon: () => {
        dispatch(getMapsPokemon())
    }
})

const styles = StyleSheet.create({
    activityIndicator: {
        color: '#0000ff',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Maps)
