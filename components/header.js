import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
  
        <Image
          source={require("../assets/myimages/logo.png")}
          style={styles.logo}
        />
        {/* <Text style={styles.title}>My books</Text> */}
        
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 20,
    marginBottom: 30
  },
  logo: {
    width: "70%",
    height: "300%",
    margin: 20,
    alignSelf: "center",
    marginBottom: 40 

  },

});
