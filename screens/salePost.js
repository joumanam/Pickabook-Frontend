import React from "react";
import { useState, useEffect } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddBook from "../components/addBook";
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

export default function SalePost(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;
  const nav = props.navigation;

  const {currentUser, setCurrentUser} = useContext(userContext);
  const currentPost = props.route.params.post;
  console.log(currentPost);

  function BookCard(props) {
    return (
      <View>
        <View style={styles.bookcard}>
          <Image
            style={{
              width: imgWidth,
              height: imgWidth,
              alignSelf: "center",
              marginBottom: 5,
            }}
            source={require("../assets/myimages/background.png")}
          />
          <Text style={{ fontWeight: "bold" }}>Book Title: </Text>
          <Text>
            {currentPost.title}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Book Author: </Text>
          <Text>
            {currentPost.author}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Language: </Text>
          <Text>
            {currentPost.language}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Category: </Text>
          <Text>
            {currentPost.category}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Condition: </Text>
          <Text>
            {currentPost.condition}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Rating: </Text>
          <Text>
            {currentPost.rating}
            {"\n"}
          </Text>
          <Text style={{ ...styles.pricetag, color: "#710D0D" }}>
          {currentPost.price} 
          </Text>
          { currentPost.user_id !== currentUser.user.id &&
          <AddButton
            title="Contact Seller"
            onPress={() => nav.navigate("Make Offer")}
          /> }
        </View>
      </View>
    );
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderWithoutLogo title="For Sale" />
        <View style={styles.content}>
          <View style={styles.list}>
            <BookCard />
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
    // marginTop: 16,
    // borderColor: "#710D0D",
    // borderWidth: 1,
    // borderRadius: 10,
    // color: "white",
    // marginLeft: 20,
    // marginRight: 20,
    width: "80%",
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
  pricetag: {
    // backgroundColor: "#710D0D",
    // marginTop: 13,
    // paddingVertical: 10,
    // borderRadius: 4,
    // color: "#fff",
    textAlign: "center",
    // fontSize: 17,
    // fontWeight: "bold",
    fontFamily: "SSBold",
    color: "#fff",
    fontSize: 18,
    paddingVertical: 3,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#710D0D",
    borderRadius: 40
  },
  // shadowProp: {
  //   shadowColor: '#171717',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
});
