import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Container, Content, Header, Left, Right, Icon, Button } from 'native-base'
import FAIcons from 'react-native-vector-icons/AntDesign'


class HeaderCustom extends React.Component {

  
  render() {
    return (
      <Header style={{
        backgroundColor: '#2c3e50',
        height: 70, borderBottomColor: '#757575',
       
      }}>
        <Left style={{ flexDirection: 'row' }}>
        <Image resizeMode='contain' style={{ width: 70, height: 40, top: 10, left: 0}}
        source = {require('../assets/icon.png')} />
        </Left>
        <Right>
         <Text style={{}}>Community Exchange</Text>
        </Right>
      </Header>
    );
  }


}


export default HeaderCustom;