import React from "react";
import { useState, useEffect } from "react";
import { LogBox } from 'react-native';
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddBook from "../components/addWishlist";
import WishlistItems from "../components/wishlistItems";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  FlatList,
} from "react-native";
// import { Icon } from 'react-native-elements';

export default function UserWishlist() {
  const [todos, setTodos] = useState([
    { title: "Book1", author: "Author1", key: "1" },
    { title: "Book2", author: "Author2", key: "2" },
    { title: "Book3", author: "Author3", key: "3" },
    { title: "Book3", author: "Author3", key: "4" },
  ]);

 
  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (title, author) => {
    setTodos((prevTodos) => {
      return [
        {title: title, author: author, key: Math.random().toString() },
        ...prevTodos
       ];
   })
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
  }, [])

  return (
  
    <View style={styles.container}>
    <ImageBackground
        source={require("../assets/myimages/download.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
      >
            <ScrollView>

       <HeaderWithoutLogo title="Wishlist" />
        <View style={styles.content}>
          <View style={styles.list}>
            <FlatList style={styles.flatList}
          data={todos}
          renderItem={({ item }) => (
            <WishlistItems isMine={false} item={item}/>
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
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  background: {
    width: "100%",
    position: 'relative'
  },
});
