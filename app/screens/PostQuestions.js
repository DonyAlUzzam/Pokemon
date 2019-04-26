import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  BackHandler
} from "react-native";

import {getUser, postQuestion} from '../redux/actions'
import {connect} from 'react-redux'
import {getValue} from '../redux/service/storage/AsyncStorage'

// create a component
class PostQuestions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  componentDidMount() {

    this.props.navigation.addListener('didFocus', () => {
        if (this.props.isLoggedIn === false) {
            this.props.navigation.navigate('Login')
        }
        else {
            // console.log('---',this.props.token);
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

postQuestion(title, content){
  const { type, token } = this.props.token
    const authToken = type + ' ' + token;
    this.props.postQuestion(title, content, authToken);
    this.props.navigation.navigate("Home");
}

  render() {

    return (
        <ScrollView  style={styles.container}>
        <View style={styles.container2}>
          {/* <StatusBar barStyle="light-content" /> */}
          <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.title}
            onChangeText={(text) => this.setState({ title: text })}
            ref={input => (this.title = input)}
            onSubmitEditing={() => this.content.focus()}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Title"
            placeholderTextColor="rgba(225,225,225,0.7)"
          
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={(text) => this.setState({ content: text })}
            ref={input => (this.content = input)}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Your Questions"
            placeholderTextColor="rgba(225,225,225,0.7)"
            multiline = {true}
            numberOfLines = {4}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.postQuestion(this.state.title, this.state.content)}
          >
            <Text style={styles.buttonText}>ASK QUESTIONS</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
       
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log('---->', state.account.access_token)
  return { 
    user: state.account.user,
    token: state.account.access_token,
    isLoggedIn: state.account.isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  getUser: (token) => dispatch(getUser(token)),
  postQuestion: (title, content, authToken) => dispatch(postQuestion(title, content, authToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostQuestions)


const styles = StyleSheet.create({
  container2: {
    padding: 20,
    marginTop: 10
    //  paddingBottom: 100
  },
  input: {
    // height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#000"
  },
  redirectLink: {
    // marginTop: 10,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center"
  },
  link: {
    color: "blue"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  loginButton: {
    backgroundColor: "#2980b6",
    color: "#fff"
  },
  container: {
    flex: 1,
    // backgroundColor: "#2c3e50"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: 300
  },
  title: {
    color: "#FFF",
    marginTop: 120,
    width: 180,
    textAlign: "center",
    opacity: 0.9
  }
});


