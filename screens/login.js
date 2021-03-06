import React from "react";
import Header from "../components/header";
import { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { userContext } from "../userContext";
import API from "../assets/API";
import base64 from "react-native-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function Login(props) {
  const { currentUser, setCurrentUser } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsOpen, setIsOpen] = useState(false);

  const setPasswordProps = (value) => {
    setPassword(value);
  };
  const setEmailProps = (value) => {
    setEmail(value);
  };

  async function loginHandler() {
    const params = {
      email,
      password,
    };

    axios
      .post(`${API}/api/auth/login`, params)
      .then((response) => {
        let code = response.data.code;
        if (parseInt(code) !== 200) {
          if (parseInt(code) == 401) {
            throw new Error("Unauthorized");
          }
          if (parseInt(code) == 422) {
            throw new Error("Incorrect email address or password!");
          }
        }

        setCurrentUser(response.data);
        // props.navigation.navigate("All Books");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //// TEMP ////
  const autoLogin = () => {
    const params = {
      email: "joum@se.io",
      password: "password",
    };

    axios
      .post(`${API}/api/auth/login`, params)
      // .post("http://25f7-91-232-100-196.ngrok.io/api/auth/login", params)
      .then((response) => {
        let code = response.data.code;
        if (parseInt(code) !== 200) {
          if (parseInt(code) == 401) {
            throw new Error("Unauthorized");
          }
          if (parseInt(code) == 422) {
            throw new Error("Incorrect email address or password!");
          }
        }

        setCurrentUser(response.data);
        // props.navigation.navigate("All Books");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // React.useEffect(() => {
  //   autoLogin();
  // }, []);

  // Each user is a seller and a buyer.

  //// END TEMP ////

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require("../assets/myimages/background.png")}
        style={styles.container}
      >
        <View style={styles.centerizedView}>
        <KeyboardAvoidingView behavior="padding: 60"> 

          <ScrollView>
              <View style={styles.authBox}>
                <Header />
                <View style={styles.inputBlock}>
                  <View style={styles.hr}></View>
                  <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <Input
                      style={styles.input}
                      // autoCapitalize={false}
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      placeholder="Email Address"
                      onChangeText={(value) => setEmail(value)}
                      defaultValue={email}
                      handler={setEmailProps}
                      leftIcon={
                        <Icon
                          name="envelope"
                          type="font-awesome"
                          size={22}
                          color="#710D0D"
                        />
                      }
                    />
                  </View>
                  <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <Input
                      style={styles.input}
                      // autoCapitalize={false}
                      // onPress={addPadding}
                      secureTextEntry={true}
                      textContentType="password"
                      placeholder="Password"
                      onChangeText={(value) => setPassword(value)}
                      defaultValue={password}
                      handler={setPasswordProps}
                      leftIcon={
                        <Icon
                          name="lock"
                          type="font-awesome"
                          size={22}
                          color="#710D0D"
                        />
                      }
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={loginHandler}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Register")}
                >
                  <Text style={styles.registerText}>New to Pick-A-Book?</Text>
                  <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
                    Register Now
                  </Text>
                </TouchableOpacity>
              </View>
              </ScrollView>

            </KeyboardAvoidingView>
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
    marginTop: 5,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 1,
    // textDecorationLine: 'underline'
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
});
