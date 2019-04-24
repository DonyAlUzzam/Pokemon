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
  Dimensions
} from "react-native";




const onButtonPress = () => {
this.props.navigation.navigate('ProfileScreen')
};


// create a component
class Register extends Component {
  render() {
    return (
        <ScrollView  style={styles.container}>
     
        {/* <View style={styles.loginContainer}> */}
          <Image style={styles.logo} source={require("../../assets/logo.png")} />
        {/* </View> */}
        <View style={styles.container2}>
          {/* <StatusBar barStyle="light-content" /> */}
          <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            autoCapitalize="none"
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
            ref={input => (this.passwordInput = input)}
            placeholder="Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            returnKeyType="go"
            ref={input => (this.confirmPassword = input)}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(225,225,225,0.7)"
            secureTextEntry
          />
          {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("Home")}
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

// define your styles
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

//make this component available to the app
export default Register;
