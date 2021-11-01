import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import BookCard from "../components/bookCard";
import { set } from "react-native-reanimated";
import { userContext } from "../userContext";
import API from '../assets/API';


export default function AllBooks(props) {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const { currentUser, setCurrentUser } = useContext(userContext);
  const inSearch = false;
  const imgWidth = Dimensions.get("screen").width * 0.5;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/api/showallbooks`, {
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

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => {
        return book.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, books]);

  console.log(books);

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.container}>
        <View style={styles.searchView}>
          {/* <View style={styles.inputView}> */}
            <TextInput
              defaultValue={search}
              style={styles.input}
              placeholder="Search"
              textContentType="name"
              onChangeText={(value) => setSearch(value)}
              returnKeyType="search"
            />
            <ScrollView>
              {filteredBooks.map((book, index) => (
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
                ))}
            </ScrollView>
            {search.length === 0 ? (
              <TouchableOpacity>
                <Icon name="search" size={24} color="#333" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSearch("");
                  setFilteredBooks([]);
                }}
              >
                <Icon
                  name="cancel"
                  size={24}
                  color="#333"
                  style={{
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                    alignItems: "flex-end",
                  }}
                />
              </TouchableOpacity>
            )}
            <BookCard title="hi" author="hello" status="hey" />
          </View>
        </View>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  bookContainer: {
    marginTop: 50,
  },
  searchView: {
    display: "flex",
    flexDirection: "row",
    width: "120%"
  },
  inputView: {
    flex: 1,
    height: 40,
    backgroundColor: "#dfe4ea",
    paddingHorizontal: 10,
    borderRadius: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 18,
  },
  userCard: {
    backgroundColor: "#fafafa",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },


});
