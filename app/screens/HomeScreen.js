import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Item, Input, Icon, Card, CardItem, Right, List } from "native-base"

import { requestCameraPermission } from '../components/Permission'
import { getAll } from '../redux/actions';
import { connect } from 'react-redux';

 class HomeScreen extends Component {

 
    renderSeparator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgorundColor: '#000'}} />
        );
    };
    
      async componentDidMount() {

        this.props.navigation.addListener('didFocus', ()=>{
            this.props.getAll()
        })
        await requestCameraPermission()
     }

  render() {
    // alert(JSON.stringify(this.props.questions))
    return (
     <Container style={{ marginBottom: 5 }}>
         {/* <Content> */}
         <Card style={{ marginLeft: 5, marginRight: 5 }}>
            <CardItem header style={{ borderBottomColor: '#dee0e2', borderBottomWidth: 1}}>
              <Text style={{ fontWeight: 'bold', paddingLeft: 25 }}> All Questions</Text>
              <TouchableOpacity  onPress={() => this.props.navigation.navigate("Questions")} >
              <Text style={{ fontWeight: 'bold', paddingLeft: 25, marginLeft: 40 }}> Ask Questions</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          <Content>
            <View style={{marginBottom: 5}}>
            <FlatList
              data={this.props.questions}
              renderItem={({ item }) => (
                <View >
                  <TouchableOpacity  onPress={() => this.props.navigation.navigate("Detail", {
                   id:item.id
                  })}
                  >
                  <Card >
                    <CardItem >
                      <Text>{item.title}</Text>
                      </CardItem>
                      <CardItem >
                      <Text style={{ color: 'grey', fontSize: 11 }}>{item.user.username}</Text>
                      </CardItem>
                  </Card>
                  </TouchableOpacity>
                </View>
              )}
              ItemSeparatorComponent={this.renderSeparator}
            />
         
         </View>
        </Content>
     </Container>
    )
  }
}


const mapStateToProps = state => {
   console.log('---->', state.questions)
  return { questions: state.questions.questions }
}

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAll())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
