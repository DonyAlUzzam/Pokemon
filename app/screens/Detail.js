import React, { Component } from "react";
import {
  Container,
  Content,
  Card,
  CardItem,
  List,
  Button
} from "native-base";

import { Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, View} from "react-native";
import { BASE_URL, PIC_URL } from "react-native-dotenv";
import {getDetail, getUser, postAnswer} from '../redux/actions'
import {connect} from 'react-redux'
import {getValue} from '../redux/service/storage/AsyncStorage'

class Detail extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const data = navigation.getParam("data", "");

    this.state = {
      // data: data,
      answer: ''
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', '');
        this.props.getDetail(id);
      
}

async checkToken(idQuestion, answer){
  const token = await getValue('token')
  if(token){
    alert(answer)
  //   console.log('>>>>>>>>', idProduct);
      const { id } = this.props.user
      this.props.postAnswer(idQuestion, answer, token);
      this.props.navigation.navigate('Home');
  } else {
  
      const { type, token } = this.props.token
      const authToken = type + ' ' + token;
      const { id } =this.props.user
      this.props.postAnswer(idQuestion, answer, id, authToken);
      this.props.navigation.navigate('Home');
  }
}

// checkToken = async() => {
//   const token = await getValue('token')
//   if (token) {
//       this.props.getUser(token);
//       return 1;
//   }else{
//       const { type, token } = this.props.token
//       const authToken = type + ' ' + token;
//       this.props.getUser(authToken);
//   }
// }

// postAnswer(title, content){
//   const { type, token } = this.props.token
//     const authToken = type + ' ' + token;
//     this.props.postQuestion(title, content, authToken);
//     this.props.navigation.navigate("Home");
// }

postAnswer(idQuestion, answer){
  if(this.props.isLoggedIn === false){
      this.props.navigation.navigate('Login')
  } else {
      this.checkToken(idQuestion, answer)
  }
}


  render() {
    if(!this.props.readmore.user || !this.props.answer){
      return <Text>loading..</Text>
    }
  
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text style={styles.textProduct}>
              {this.props.readmore.title}
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>{this.props.readmore.content}</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.readmore.user.username}</Text>
            </CardItem>
            </Card>
            <Card >
            <CardItem
              style={{ borderBottomColor: "#dee0e2", borderBottomWidth: 1 }}>
              <Text style={{ fontWeight: "bold", paddingLeft: 15}}>
              {this.props.answer.length} Answers
              </Text>
            </CardItem>
          </Card>

          <List>
            <FlatList
              data={this.props.answer}
              renderItem={({ item }) => (
                <View>
                  <Card > 
                    <CardItem>
                      <Text> {item.content}</Text>
                      </CardItem>
                  </Card>
                </View>
              )}
            />
          </List>

          <Card>
            <Button   onPress={() => this.postAnswer(this.props.readmore.id, this.state.answer)}
            style={styles.btnPost}><Text style={{color: '#FFF'}}> {this.props.isLoggedIn ? "Post Answer" : "Login" }</Text></Button>
            <CardItem>
           
            <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.answer}
            onChangeText={(text) => this.setState({ answer: text })}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Your Answer"
            placeholderTextColor="rgba(225,225,225,0.7)"
            multiline = {true}
            numberOfLines = {4}
            editable={this.props.isLoggedIn ? true : false}
          />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log('->', state.questions.readmore)
  return {
      readmore: state.questions.readmore,
      answer: state.questions.answer,
      access_token: state.account.access_token,
      isLoggedIn: state.account.isLoggedIn,
      user: state.account.user
  }   
}

const mapDispatchToProps = dispatch => ({
  getDetail: (id) => dispatch(getDetail(id)),
  getUser: (token) => dispatch(getUser(token)),
  postAnswer: (idQuestion, answer, authToken) => dispatch(postAnswer(idQuestion, answer, authToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

const styles = StyleSheet.create({
  footerButtonMain: {
    backgroundColor: "#3a455c",
    marginLeft: 4,
    marginRight: 4,
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 350,
    width: null,
    flex: 1
  },
  textProduct: {
    fontWeight: "bold",
    fontSize: 22
  },
  footerStyle: {
    backgroundColor: "#3a455c",
    paddingBottom: 5,
    flexDirection: "row",

    paddingTop: 5
  },
  btnPost: {
   padding: 10,
   backgroundColor: '#0770cd'
  },
  textImage: {
    fontWeight: "bold",
    color: "#44dd44",
    fontSize: 18
  },
  input: {
    // height: 40,
    width: '100%',
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#000",
    borderWidth: 1,
    borderColor: '#0770cd'
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    alignSelf: "center",
    color: "#ffffff"
  }
});
