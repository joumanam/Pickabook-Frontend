import React from "react";
import Header from "../components/header";
import {
  StyleSheet,
  View,
  Image,

} from "react-native";
import { Icon, Input } from "react-native-elements";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/myimages/loading.gif")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
