import React from "react";
import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddBook from "../components/addWishlist";
import WishlistItems from "../components/wishlistItems";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import BookCard from "../components/bookCard";
import AddButton from "../components/addButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Notifications() {
  const [notification, setNotification] = useState([    
    {
      id: "1",
      key: '1',
      post_title: "Someone posted a book you might be interested in!",
    },
    {
      id: "2",
      key: '2',
      post_title: "Someone bid higher than you! Go to the post",
    },
    {
      id: "3",
      key: '3',
      post_title: "Someone made an offer on your book!",
    },
    {
      id: "4",
      key: '4',
      post_title: "Someone made a bid on your book!",
    },
    {
      id: "5",
      key: '5',
      post_title:
        "Congratulations! You won the auction. Check the details here.",
    },
  ]);

  const pressHandler = (key) => {
    setNotification((prevNotifications) => {
      return prevNotifications.filter((notification) => notification.key != key);
    });
  };

  const txtWidth = Dimensions.get("screen").width * 0.72;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/myimages/backgroundOpaque.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
      >
        <ScrollView>
          <HeaderWithoutLogo title="Notifications" />
          <FlatList
            data={notification}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.notif}>
                  <Text style={{ fontWeight: "bold", width: txtWidth }}>
                    {item.post_title}
                  </Text>
                  <TouchableOpacity>
                  <MaterialCommunityIcons
                    style={{ justifyContent: "flex-end", marginRight: 3 }}
                    name="delete"
                    size={26}
                    color={"#710D0D"}
                    onPress={() => {
                      Alert.alert("WARNING", "Are you sure you want to delete this?", [
                        {text: 'Yes', onPress: () => pressHandler(item.key)}, 
                        {text: 'Cancel'}
                      ])
                    }}
                  />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notif: {
    flex: 1,
    width: "90%",
    height: "100%",
    padding: 15,
    backgroundColor: "#f0f2f5",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 10,
    shadowColor: "black",
    elevation: 8,
    borderRadius: 5,
  },
});
