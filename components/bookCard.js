import { StatusBar } from "expo-status-bar";
import { useState, useContext } from "react";
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
import { userContext } from "../userContext";

const imgWidth = Dimensions.get("screen").width * 0.33;
const txtWidth = Dimensions.get("screen").width * 0.33;

export default function BookCard(props) {
  return (
    <View>
      <View style={styles.bookcard}>
    
        <Image
          style={{
            width: imgWidth,
            height: imgWidth,
            alignSelf: "center",
            marginBottom: 5,
            borderWidth: 1,
            borderColor: 'black'
          }}
          resizeMode="contain"
          source={{
            uri:props.image_url,
          }}
        />
        
        <Text style={{ fontWeight: "bold" }}>Book Title: </Text>
        <Text style={{ width: txtWidth }}>
          {props.title}
          {"\n"}
        </Text>
        <Text style={{ fontWeight: "bold" }}>Book Author: </Text>
        <Text style={{ width: txtWidth }}>
          {props.author}
          {"\n"}
        </Text>
        <Text style={{ fontWeight: "bold" }}>Status: </Text>
        <Text style={{ width: txtWidth }}>
          {props.status}
          {"\n"}
        </Text>
        <AddButton title="Check Post" onPress={props.onPress} />
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
    marginBottom: 10,
    borderRadius: 10,
    color: "white",
    marginLeft: 20,
  },
});
