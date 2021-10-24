import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { Icon } from "react-native-elements";

export default function SearchBar({ value, updateSearch, style }) {
  const [query, setQuery] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.viewSearch}>
          <Icon name="search" size={24} color="#333" style={styles.icon} />
        </View>
        <TextInput
          style={styles.textInput}
          inlineImageLeft="search"
          placeholder="Search"
          onChangeText={(text) => {
            setQuery(text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    height: 40,
    alignItems: "center",
  },
  searchContainer: {
    backgroundColor: "white",
    width: "96%",
    height: 35,
  },
  icon: {
    justifyContent: "center",
    height: 22,
    width: 22,
    marginTop: 30,
    marginLeft: 5,
  },
  textInput: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 30,
    marginBottom: 5
  },
  viewSearch: {
    flex: 0.2,
    justifyContent: "center",
  },
});
