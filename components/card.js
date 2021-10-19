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

export default function Card(props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      elevation: 3,
      backgroundColor: "grey",
      shadowOffset: { width:1, height:1 }, 
    },
    cardContent: {

    }
})