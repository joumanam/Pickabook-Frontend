import React from "react";
import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddBook from "../components/addWishlist";
import WishlistItems from "../components/wishlistItems";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import BookCard from "../components/bookCard";
import AddButton from "../components/addButton";
import { useContext } from "react";
import { userContext } from "../userContext";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Importing fonts
import { useFonts } from "expo-font";
import NSLight from "../assets/fonts/NunitoSans/NunitoSansLight.ttf";
import NSRegular from "../assets/fonts/NunitoSans/NunitoSansRegular.ttf";
import NSBold from "../assets/fonts/NunitoSans/NunitoSansBold.ttf";
import NSExtraBold from "../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf";
import NSSemiBoldItalic from "../assets/fonts/NunitoSans/NunitoSansSemiBoldItalic.ttf"

export default function EventPost(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;
  const nav = props.navigation;
  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
    NSSemiBoldItalic
  });

  function EventCard(props) {
    return (
      <View>
        <View style={styles.bookcard}>
        <Text style={styles.eventTitle}>Salon Du Livre {"\n"}</Text>

          <Image
            style={{
              width: imgWidth,
              height: imgWidth,
              alignSelf: "center",
              marginBottom: 5,
            }}
            source={require("../assets/myimages/background.png")}
          />
         
          <Text style={styles.titles}>Location: </Text>
          <Text style={styles.input}>Forum De Beirut{"\n"}</Text>
          <Text style={styles.titles}>Date: </Text>
          <Text style={styles.input}>2021-11-07 {"\n"}</Text>
          <Text style={styles.titles}>Time: </Text>
          <Text style={styles.input}>23:21:00 {"\n"}</Text>
          <Text style={styles.titles}>Additional Information: </Text>
          <Text style={styles.input}>For more info, call +961 70 123456 {"\n"}</Text>
         
        </View>
      </View>
    );
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderWithoutLogo title="Event" />
        <View style={styles.content}>
          <View style={styles.list}>
            <EventCard />
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
  },
  background: {
    width: "100%",
    position: "relative",
  },
  bookcard: {
    padding: 16,
    marginTop: -40,
    width: "110%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventTitle: {
    // fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 27,
    fontFamily: 'NSSemiBoldItalic',
    color: "#710D0D"
  },
  titles: {
    fontWeight: 'bold',
    marginLeft: 45
  },
  input: {
    marginLeft: 45,
    marginRight: 30,
    fontFamily: 'NSSemiBoldItalic'
  },
});
