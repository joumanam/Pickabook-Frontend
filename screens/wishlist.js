import React from "react";
import { useState } from "react";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import AddBook from "../components/addBook";
import BookList from "../components/booklist";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
} from "react-native";
// import { Icon } from 'react-native-elements';

export default function Wishlist() {
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

  return (
  
    <ScrollView>
    <View style={styles.container}>
       <HeaderWithoutLogo title="My Wishlist" />
        <View style={styles.content}>
          <AddBook submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList style={styles.flatList}
          data={todos}
          renderItem={({ item }) => (
            <BookList item={item} pressHandler={pressHandler}/>
          )}
        />
           
          </View>
        </View>
    </View>
</ScrollView>  );
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
    position: 'relative'
  },
});
