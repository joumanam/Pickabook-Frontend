import React from "react";
import { useState, useEffect, useContext } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import WishlistItems from "../components/wishlistItems";
import { FAB } from "react-native-paper";
import OfferPost from "../components/OfferPost";
import {
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import BookCard from "../components/bookCard";
import AddButton from "../components/addButton";
import { userContext } from "../userContext";
import { Rating } from "react-native-ratings";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ViewOffers(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;
  const nav = props.navigation;

  // const { currentUser, setCurrentUser } = useContext(userContext);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderWithoutLogo title="Offers" />
        <View style={styles.content}>
          <View style={styles.list}>
            <OfferPost />
            <OfferPost />
            <OfferPost />

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    marginBottom: 20,
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
    flexDirection: "column"
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  accept: {
    backgroundColor: "green",
    marginRight: 15
  },
  reject: {
    backgroundColor: "#db0f0f",
    marginLeft: 15
  },
  inCardText: {
    marginLeft: 30
  }
});
