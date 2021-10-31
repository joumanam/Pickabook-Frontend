import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground
} from "react-native";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddEventComponent from "../components/addEventComponent";
import * as ImagePicker from 'expo-image-picker'

export default function AddNewEvent(props) {

  const nav = () => {
    props.navigation.navigate("Event Map");
  }

    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/myimages/background.png")} style={{width: '100%', height:'100%', position: 'absolute'}}  resizeMode="cover">
        <HeaderWithoutLogo title="Add New Event" />
        <ScrollView>
        <View style={styles.authBox}>
        <View style={{padding: 10}}>
        <AddEventComponent user={props.route.params.user} coordinates={props.route.params.coordinates} nav={nav}/>
        </View>
        </View>
        </ScrollView>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authBox: {
    width: "80%",
    marginTop: 30,
    marginBottom: 18,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
},
});
