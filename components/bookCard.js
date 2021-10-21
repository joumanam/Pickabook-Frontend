import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import DeleteButton from "./deleteButton";
import AddButton from "./addButton";

const imgWidth = Dimensions.get("screen").width * 0.33;

export default function BookCard(props) {
  return (
    <View>
      <View style={styles.bookcard}>
        <Image style={{ width: imgWidth, height: imgWidth }}
          // style={styles.coverImage}
          source={require("../assets/myimages/background.png")}
        />
        <Text style={{ fontWeight: "bold" }}>Book Title: </Text>
        <Text>{props.title}{"\n"}</Text>
        <Text style={{ fontWeight:"bold" }}>Book Author: </Text>
        <Text>{props.author}</Text>
        <AddButton title="Check Post" onPress={props.onPress}
          
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookcard: {
    padding: 16,
    marginTop: 16,
    borderColor: "#710D0D",
    borderWidth: 1,
    borderRadius: 10,
    color: "white",
    marginLeft: 20,
    // marginRight: 20

  },
});
