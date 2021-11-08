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
import API from '../assets/API';

import { useContext } from "react";
import { userContext } from "../userContext";
import BookCard from "../components/bookCard";
import { TouchableOpacity } from "react-native-gesture-handler";



export default function SearchResults(props) {
  const imgWidth = Dimensions.get("screen").width * 0.5;
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [books, setBooks] = useState([]);
  const users = props.route.params.data.users;


  useEffect(() => {
    axios.get(`${API}/api/showallbooks`, {
      headers: {
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    })
    .then((response) => {
      // console.warn(response.data);
      const searchResults = filterSearchResults(response.data);
      const stringifyId = searchResults.map(book => {
        return {...book, user_id: book.user_id.toString()}
      })
      setBooks(stringifyId);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])


  function filterSearchResults(res) {
    let filteredBySearch = [];
    let filteredByLang = [];
    let filteredByStatus = [];
    // console.warn(props.route.params.data)

    if (props.route.params.data.search !== '') {
      filteredBySearch = res.filter(book => {
        if (book.title.toLowerCase().includes(props.route.params.data.search.toLowerCase()) 
          || book.author.toLowerCase().includes(props.route.params.data.search.toLowerCase())) {
            return book;
        }
      })
    } else {
      filteredBySearch = res;
    }
 
    if (props.route.params.data.searchLang) {
      filteredByLang = res.filter(book => {
        if (book.language.toLowerCase().includes(props.route.params.data.searchLang.toLowerCase())) {
          return book;
        }
      })
    } else {
      filteredByLang = res;
    }

    if (props.route.params.data.status !== 'No Filter') {
      filteredByStatus = res.filter(book => {
        if (book.status.toLowerCase().includes(props.route.params.data.status.toLowerCase())) return book;
      })
    } else {
      filteredByStatus = res;
    }

    let filtered = [];

    for (let i=0; i<res.length; i++) {
      let inFilteredBySearch = false;
      let inFilteredByLang = false;
      let inFilteredByStatus = false;

      for (let j=0; j<filteredBySearch.length; j++) {
        if (filteredBySearch[j].id === res[i].id) {
          // console.warn('loop 1', filteredBySearch[j].id, res[i].id)
          inFilteredBySearch = true;
        }
      }

      for (let k=0; k<filteredByLang.length; k++) {
        if (filteredByLang[k].id === res[i].id) {
          // console.warn('loop 2', filteredByLang[k].id, res[i].id)
          inFilteredByLang = true;
        }
      }

      for (let l=0; l<filteredByStatus.length; l++) {
        if (filteredByStatus[l].id === res[i].id) {
          // console.warn('loop 3', filteredByStatus[l].id, res[i].id)
          inFilteredByStatus = true;
        }
      }

      if (inFilteredBySearch && inFilteredByLang && inFilteredByStatus) {
        filtered.push(res[i]);
        // console.warn(res[i].title)
      }
      inFilteredByLang = false;
      inFilteredBySearch = false;
      inFilteredByStatus = false;
    }

    return filtered;
  }


const onPress = (post, user) => {
 if (post.status === "For Trade") props.navigation.navigate('Trade Post', {post, user})
 if (post.status === "For Sale") props.navigation.navigate('Sale Post', {post, user})
 if (post.status === "For Auction") props.navigation.navigate('Auction Post', {post, user})
};

  useEffect(() => {
    setLoading(true);
    // getSearchResults();
    // getSearchResultsTEST();
  }, []);
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.posts}>
          {(books && users) && books.map((book, user, index) => (
            <View>
              <TouchableOpacity style={{marginLeft: 25, marginTop: 15}} onPress={()=>{currentUser.user.id === book.user_id ? props.navigation.navigate('My Profile') : props.navigation.navigate('User Profile', {userId: book.user_id})}}>
              <Text style={styles.postedBy}>Posted By
                <Text style={{color: 'blue'}}>
                  {` ${users[book.user_id].full_name}`}
                </Text>
              </Text>
              </TouchableOpacity>
              <BookCard
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
                title={book.title}
                author={book.author}
                status={book.status}
                image_url={book.image_url}          
                onPress = {() => onPress(book, users[book.user_id])}    
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
