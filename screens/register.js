import React from "react";
import Header from "../components/header";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Icon, Input } from 'react-native-elements';

export default function Register(props) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../assets/myimages/background.png")}
        style={styles.container}
      >
          <View style={styles.centerizedView}>

            <View style={styles.authBox}>
            <ScrollView style={styles.scroll}>

              <Header />
              <View style={styles.inputBlock}>
                <View style={styles.hr}></View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <Input
                    style={styles.input}
                    // autoCapitalize={false}
                    keyboardType="default"
                    textContentType="givenName"
                    placeholder="First Name"
                    leftIcon={<Icon name='user' type='font-awesome' size={22} color="#710D0D" />}

                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <Input
                    style={styles.input}
                    // autoCapitalize={false}
                    keyboardType="default"
                    textContentType="familyName"
                    placeholder="Last Name"
                    leftIcon={<Icon name='user' type='font-awesome' size={22} color="#710D0D" />}

                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <Input
                    style={styles.input}
                    // autoCapitalize={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Email Address"
                    leftIcon={<Icon name='envelope' type='font-awesome' size={22} color="#710D0D" />}

                    
                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <Input
                    style={styles.input}
                    // autoCapitalize={false}
                    secureTextEntry={true}
                    textContentType="password"
                    placeholder="Password"
                    leftIcon={<Icon name='lock' type='font-awesome' size={22} color="#710D0D" />}

                  />
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <Input
                    style={styles.input}
                    // autoCapitalize={false}
                    secureTextEntry={true}
                    textContentType="password"
                    placeholder="Confirm Password"
                    leftIcon={<Icon name='lock' type='font-awesome' size={22} color="#710D0D" />}

                  />
                </View>
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={() => props.navigation.navigate("Login")}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                <Text style={styles.registerText}>Already have an account?</Text>
                <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                  Login
                </Text>
              </TouchableOpacity>
              </ScrollView>

            </View>

          </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerizedView: {
    width: "100%",
    top: "15%",
    marginBottom: 135
  },
  authBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: "green",
    borderRadius: 1000,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: -50,
    marginBottom: -50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  hr: {
    width: "100%",
    height: 0.5,
    color: "#710D0D",
    borderBottomWidth: 2,
    backgroundColor: "#710D0D",
    marginTop: 6,
    borderBottomColor: "#710D0D",
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  inputBlock: {
    marginTop: 100,
  },
  input: {
    width: "100%",
    height: 40,
    // backgroundColor: "#dfe4ea",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#710D0D",
    marginTop: 13,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
  },
  // scroll: {
  //   height: "match_parent",
  // },
});
