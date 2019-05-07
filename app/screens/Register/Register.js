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
import {registerUser} from '../../redux/actions'


// create a component
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm_password:""
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

  register(username, email, password, confirm_password){
    if (confirm_password !== password){
      alert("password not match");
    } else {
      this.props.registerUser(username, email, password, confirm_password)
      this.props.navigation.navigate("Home");
    }
  
  }

  render() {

    return (
        <ScrollView  style={styles.container}>
     
        {/* <View style={styles.loginContainer}> */}
          <Image resizeMode='center' style={styles.logo} source={require("../../assets/poke.png")} />
        {/* </View> */}
        <View style={styles.container2}>
          {/* <StatusBar barStyle="light-content" /> */}
          <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            ref={input => (this.username = input)}
            onSubmitEditing={() => this.email.focus()}
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholder="Username"
            placeholderTextColor="rgba(225,225,225,0.7)"
          />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            ref={input => (this.email = input)}
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
          <TextInput
            style={styles.input}
            returnKeyType="go"
            value={this.state.confirm_password}
            onChangeText={(text) => this.setState({ confirm_password: text })}
            ref={input => (this.confirmPassword = input)}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.register(this.state.username, this.state.email, this.state.password, this.state.confirm_password)}
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
       
        <View style={styles.redirectLink}>
          <Text style={{color: 'white'}}>Sudah punya akun? </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.link}>Login</Text>
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
  registerUser: (username, email, password, confirm_password) => dispatch(registerUser(username, email, password, confirm_password))
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)

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


