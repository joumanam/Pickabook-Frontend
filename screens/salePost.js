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
import { Rating } from "react-native-ratings";

export default function SalePost(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;
  const nav = props.navigation;

  const { currentUser, setCurrentUser } = useContext(userContext);
  const post = props.route.params.post;
  const user = props.route.params.user;

  console.log(post);

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
                borderWidth: 1,
                borderColor: 'black'
              }}
              resizeMode="contain"
              source={{
                uri: post.image_url,
              }}
            />
          <Text style={{ fontWeight: "bold" }}>Book Title: </Text>
          <Text>
            {post.title}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Book Author: </Text>
          <Text>
            {post.author}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Language: </Text>
          <Text>
            {post.language}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Category: </Text>
          <Text>
            {post.category}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Condition: </Text>
          <Text>
            {post.condition}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Rating: </Text>
          <Text>
            <Rating
              imageSize={20}
              readonly
              startingValue={post.rating}
              style={styles.rating}
            />
            {"\n"}
          </Text>
          <Text style={{ ...styles.pricetag, color: "#710D0D" }}>
            {post.price}
          </Text>
          {post.user_id !== currentUser.user.id && (
            <AddButton
              title="Contact Seller"
              onPress={() => props.navigation.navigate("Chat Window", {user: user})}
              />
          )}
          {post.user_id == currentUser.user.id && (
            <TouchableOpacity style={{ color: "#710D0D", marginTop: 5 }}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={25}
                color={"#710D0D"}
                style={{ alignSelf: "center", justifyContent: "center" }}
              />
            </TouchableOpacity>
          )}
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
            <BookCard navigation={props.navigation}/>
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
    borderRadius: 40,
  },
  // shadowProp: {
  //   shadowColor: '#171717',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
});
