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
  TouchableOpacity,
  Image,
} from "react-native";
import Card from "./card";
import DeleteButton from "./deleteButton";


export default function BookList({ item, pressHandler }) {


  return (
    <TouchableOpacity >
      <View style={styles.item}>
        <Text style={{fontWeight: 'bold'}}>Book Title: </Text><Text>{item.title}{'\n'}</Text>
        <Text style={{fontWeight: 'bold'}}>Book Author: </Text><Text>{item.author}</Text>
        <DeleteButton onPress={() => {
          Alert.alert("WARNING", "Are you sure you want to delete this?", [
            {text: 'Yes', onPress: () => pressHandler(item.key)}, 
            {text: 'Cancel'}
          ])
        }}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#710D0D",
    borderWidth: 1,
    borderRadius: 10,
    color: 'white'
  },
});
