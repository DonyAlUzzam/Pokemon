import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { Text } from 'native-base';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

import { getDetailPokemon } from '../redux/actions';

class Detail extends Component {

    constructor(props) {
        super(props);
        const { navigation } = props;
        const data = navigation.getParam("data", "");
    
        this.state = {
          data: data,
          readmore: ''
        };
      }

    componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', '')
        // alert(id)
        this.props.getDetailPokemon(id)
    }

    render() {
    // alert(this.props.readmore)
        if (!this.props.readmore || !this.props.readmore.latitude) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        } else {
            return (

                <ScrollView>
                    <View>
                        <Image style={styles.image}
                            source={{ uri: this.props.readmore.image_url }}
                        />
                        <View style={styles.container}>
                        
                            <Text style={styles.name}>{this.props.readmore.name}</Text>
                            <MapView
                                style={{ width: '100%', height: 200 }}
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
                                />
                                
                            </MapView>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }
}

const mapStateToProps = state => {
    // alert(state.pokemons.readmore)
    return {
        readmore: state.pokemons.readmore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailPokemon: (id) => {
            dispatch(getDetailPokemon(id))
        }
    }
}

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

