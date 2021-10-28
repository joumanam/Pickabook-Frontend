import React from "react";
import { useState, useEffect, useContext } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
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
import { userContext } from "../userContext";

export default function TradePost(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;
  const nav = props.navigation;

  const { currentUser, setCurrentUser } = useContext(userContext);
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

          {currentPost.user_id !== currentUser.user.id && (
            <AddButton
              title="Make An Offer"
              onPress={() => nav.navigate("Make Offer")}
            />
          )}

          {currentPost.user_id == currentUser.user.id && (
            <AddButton
              title="View Offers"
              onPress={() => nav.navigate("Make Offer")}
            />
          )}
        </View>
      </View>
    );
  }

  const [todos, setTodos] = useState([
    { title: "Book1", author: "Author1", key: "1" },
    { title: "Book2", author: "Author2", key: "2" },
    { title: "Book3", author: "Author3", key: "3" },
    { title: "Book3", author: "Author3", key: "4" },
  ]);

  const submitHandler = (title, author) => {
    setTodos((prevTodos) => {
      return [
        { title: title, author: author, key: Math.random().toString() },
        ...prevTodos,
      ];
    });
  };

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
    backgroundColor: "#710D0D",
    marginTop: 13,
    paddingVertical: 10,
    borderRadius: 4,
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  // shadowProp: {
  //   shadowColor: '#171717',
  //   shadowOffset: {width: -2, height: 4},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
});
