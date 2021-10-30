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
import DeleteButton from "./deleteButton";

export default function WishlistItems({ item, pressHandler, isMine }) {
  return (
    <View>
      <View style={styles.item}>
        <Text style={{ fontWeight: "bold" }}>Book Title: </Text>
        <Text>
          {item.title}
          {"\n"}
        </Text>
        <Text style={{ fontWeight: "bold" }}>Book Author: </Text>
        <Text>{item.author}</Text>
        {isMine && (
          <DeleteButton
            onPress={() => {
              Alert.alert("WARNING", "Are you sure you want to delete this?", [
                { text: "Yes", onPress: () => pressHandler(item.key) },
                { text: "Cancel" },
              ]);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    // borderRadius: 10,
    backgroundColor: "#f2f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,}
});
