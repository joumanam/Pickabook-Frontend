import React from "react";
import { useState, useEffect } from "react";
import { LogBox, ImageBackground } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddWishlist from "../components/addWishlist";
import WishlistItems from "../components/wishlistItems";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
// import { Icon } from 'react-native-elements';

export default function MyWishlist() {
  const [books, setBooks] = useState([
    { title: "Book1", author: "Author1", key: "1" },
    { title: "Book2", author: "Author2", key: "2" },
    { title: "Book3", author: "Author3", key: "3" },
    { title: "Book4", author: "Author4", key: "4" },
  ]);

  const pressHandler = (key) => {
    setBooks((prevBooks) => {
      return prevBooks.filter((book) => book.key != key);
    });
  };

  const submitHandler = (title, author) => {
    setBooks((prevBooks) => {
      return [
        { title: title, author: author, key: Math.random().toString() },
        ...prevBooks,
      ];
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/myimages/download.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
      >
        <ScrollView>
          <HeaderWithoutLogo title="My Wishlist" />
          <View style={styles.content}>
            <AddWishlist submitHandler={submitHandler} />
            <View style={styles.list}>
              <FlatList
                style={styles.flatList}
                data={books}
                renderItem={({ item }) => (
                  <WishlistItems
                    isMine={true}
                    item={item}
                    pressHandler={pressHandler}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    // marginBottom: 20,
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
});
