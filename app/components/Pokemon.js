import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Card, CardItem, Body, Header, Thumbnail } from "native-base";

class Pokemon extends Component {
    render() {
    //    alert(this.props.itemType)
        return (
            
            <View style={{ flex: 1, flexDirectopn: "column", backgroundColor: 'silver' }}>
                <Card>
                    <TouchableOpacity onPress={this.props.getDetails}>
                        <CardItem cardBody>
                            <Image resizeMode='center'
                                source={{
                                    uri: this.props.itemImage
                                }}
                                style={{ height: 130, width: null, flex: 1, padding: 10 }}
                            />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{fontSize: 20, fontWeight: "bold" }}>
                                    {this.props.itemName}
                                </Text>
                            
                                <Text style={{ fontSize: 13, fontSize: 15 }}>
                                   Kategori: {this.props.itemCategory}
                                </Text>
                                <Text style={{ fontSize: 13, fontSize: 15 }}>
                                   Type: {this.props.itemType}
                                </Text>
                            </Body>
                        </CardItem>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
}

export default Pokemon;
