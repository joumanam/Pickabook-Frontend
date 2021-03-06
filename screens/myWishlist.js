import React from "react";
import { useState, useEffect, useContext } from "react";
import { LogBox, ImageBackground } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddWishlist from "../components/addWishlist";
import WishlistItems from "../components/wishlistItems";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import { userContext } from "../userContext";
import axios from "axios";
import API from "../assets/API";

export default function MyWishlist() {
  const [books, setBooks] = useState([]);
  const { currentUser, setCurrentUser } = useContext(userContext);

  console.log(currentUser);
  useEffect(() => {
    axios
      .get(`${API}/api/show/${currentUser.user.id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      })
      .then((response) => {
        setBooks(response.data.wishlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("wishlist", books);

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
    LogBox.ignoreLogs(["VirtualizedLists should"]);
    LogBox.ignoreLogs(["Failed child."]);
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
