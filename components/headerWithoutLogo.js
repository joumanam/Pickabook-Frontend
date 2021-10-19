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
  ImageBackground,
} from "react-native";

export default function HeaderWithoutLogo(props) {
  return (
  
      <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: "#710D0D",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#710D0D",
  },
});
