import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Item, Input, Icon, Card, CardItem, Right, List } from "native-base"


export default class HomeScreen extends Component {

  componentWillMount() {
    OneSignal.init("YOUR_ONESIGNAL_APPID");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
}

componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
}

onReceived(notification) {
    console.log("Notification received: ", notification);
}

onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
}

    renderSeparator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgorundColor: '#000'}} />
        );
    };
    
    state = {
        data: [
          {
            key: 'a',
            itemTitle: 'Ilmu Pengetahuan Sosial',
            itemName: "Salah satu contoh penggunaan alat tradisional ke alat modern dalam kehidupan sehari hari yaitu?",
            itemCreator: "Fajri",
          },
          {
            key: 'b',
            itemTitle: 'Matematika',
            itemName: "sebuah ruangan berbentuk persegi dengan panjang sisi 9 m kali 9 m tentukan keliling ruangan tersebut​?",
            itemCreator: "Dony",
          },
          {
            key: 'c',
            itemTitle: 'Movie',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'd',
            itemTitle: 'Cake',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'e',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'f',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'g',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'h',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'i',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'j',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'k',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          },
          {
            key: 'l',
            itemTitle: 'cccccccc',
            itemName: "Complete your shopping happiness?",
            itemCreator: "Dony",
          }
        ]
      }
    

  render() {
    
    return (
     <Container style={{ marginBottom: 5 }}>
         {/* <Content> */}
         <Card style={{ marginLeft: 5, marginRight: 5 }}>
            <CardItem header style={{ borderBottomColor: '#dee0e2', borderBottomWidth: 1}}>
              <Text style={{ fontWeight: 'bold', paddingLeft: 25 }}> All Questions</Text>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate("Register")} >
              <Text style={{ fontWeight: 'bold', paddingLeft: 25, marginLeft: 40 }}> Ask Questions</Text>
              </TouchableOpacity>
            </CardItem>
            <List>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate("Detail", {
                   data:item
                  })}
                  >
                  <Card >
                    <CardItem>
                      <Text>{item.itemTitle}</Text>
                      </CardItem>
                      <CardItem>
                      <Text style={{ color: 'grey', fontSize: 11 }}>{item.itemCreator}</Text>
                      </CardItem>
                  </Card>
                  </TouchableOpacity>
                </View>
              )}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </List>
          </Card>
        {/* </Content> */}
     </Container>
    )
  }
}
