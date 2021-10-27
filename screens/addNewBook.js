import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,

} from "react-native";
import { Icon } from "react-native-elements";


export default function AddNewBook() {
    return (
      <View style={styles.container}>
        <Text> Add New Book </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },

});
