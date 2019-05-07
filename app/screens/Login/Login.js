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
import {connect} from 'react-redux'

import {loginUser} from '../../redux/actions/'


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "d@gmail.com",
      password: "12345"
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate("Home");
    return true;
  };

  login(email, password) {
    this.props.loginUser(email, password);
    this.props.navigation.navigate("Home");
  }


  render() {
   
    return (
        <ScrollView  style={styles.container}>
     
          <Image resizeMode='center' style={styles.logo} source={require("../../assets/poke.png")} />
        <View style={styles.container2}>
          <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            ref={input => (this.email = input)}
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            placeholder="Email"
            placeholderTextColor="rgba(225,225,225,0.7)"
          />

          <TextInput
            style={styles.input}
            returnKeyType="next"
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            ref={input => (this.passwordInput = input)}
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.login(this.state.email, this.state.password)}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
       
        <View style={styles.redirectLink}>
          <Text style={{color: 'white'}}>Belum punya akun? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.link}>Daftar</Text>
          </TouchableOpacity>
        </View>
      
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.account.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container2: {
    padding: 20,
    marginTop: 250
    //  paddingBottom: 100
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
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
    backgroundColor: "#2c3e50"
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


