import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,

} from "react-native";
import { Icon } from "react-native-elements";


export default function EventMap() {
    return (
      <View style={styles.container}>
        <Text> Event Map</Text>
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
