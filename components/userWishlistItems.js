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
  Image,
} from "react-native";

export default function UserWishlistItems({ item }) {


  return (
    <View>
      <View style={styles.item}>
        <Text style={{fontWeight: 'bold'}}>Book Title: </Text><Text>{item.title}{'\n'}</Text>
        <Text style={{fontWeight: 'bold'}}>Book Author: </Text><Text>{item.author}</Text>
        
      </View>
    </View>
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
