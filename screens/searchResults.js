import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../userContext";
import BookCard from "../components/bookCard";

export default function SearchResults() {
  const imgWidth = Dimensions.get("screen").width * 0.5;
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://192.168.43.140:8000/api/showallbooks", {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.posts}>
          {books.map((book, index) => (
            <View>
              <Text style={styles.postedBy}>Posted By {book.user_id}</Text>
              <BookCard
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
                title={book.title}
                author={book.author}
                status={book.status}
                // onPress={ }
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posts: {
    marginRight: 10,
    marginLeft: -7,
    alignSelf: "center",
    width: "90%",
  },
  postedBy: {
    fontWeight: 'bold',
    marginTop: 10,
    fontStyle: 'italic'
  }
});
