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
import API from '../assets/API';


export default function SearchResults(props) {
  const imgWidth = Dimensions.get("screen").width * 0.5;
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});


  useEffect(() => {
    axios.get(`${API}/api/showallbooks`, {
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
  }, [])



/*
  function getSearchResults() {
    let byFilters = [];
    
    props.route.params.data.filters.map(filter => {
      switch(filter.id){
        case '1':
        case '2':
          if(filter.isChecked) {
            axios.get(`${API}/api/${filter.path}/${props.route.params.data.search}`, {
            headers: {
              Authorization: `Bearer ${currentUser.access_token}`,
            },
          })
          .then((response) => {
            byFilters = [...byFilters, response.data];
            console.log(`RESPONSE for ${props.route.params.data.search} from ${filter.path}`, byFilters)

          })
          .catch((err) => {
            console.log(err);
          });
          }
          break;

        // case '3':
        //   if(filter.isChecked) {
        //     axios.get(`${API}/api/${filter.path}/${props.route.params.data.searchLang}`, {
        //     headers: {
        //       Authorization: `Bearer ${currentUser.access_token}`,
        //     },
        //   })
        //   .then((response) => {
        //     let byLang = [];
        //     response.data.map(book => {
        //       byLang.push(book.id);
        //     })

        //     byFilters = byFilters.filter(book => {
        //       if (byLang.indexOf(book.id) !== -1) return book;
        //     })
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        //   }
        //   break;

        // case '4':
        //   if(filter.isChecked) {
        //     axios.get(`${API}/api/${filter.path}/${props.route.params.data.status}`, {
        //     headers: {
        //       Authorization: `Bearer ${currentUser.access_token}`,
        //     },
        //   })
        //   .then((response) => {
        //     let byStatus = [];
        //     response.data.map(book => {
        //       byStatus.push(book.id);
        //     })

        //     byFilters = byFilters.filter(book => {
        //       if (byStatus.indexOf(book.id) !== -1) return book;
        //     })
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        // }
        // break;
        }
    })
    console.log('RESULTS', byFilters);
    setBooks(byFilters);
  }
*/

  useEffect(() => {
    setLoading(true);
    // getSearchResults();
    // getSearchResultsTEST();
  }, []);

  // useEffect(() => {
  //   console.log('BOOKS:', books.length);
  //   setLoading(true);

  //   let users = {};
  //   for (let i=0; i<books.length; i++) {
  //     axios
  //     .get(`${API}/api/getUser/${books[i].user_id}` , {
  //       headers: {
  //         Authorization: `Bearer ${currentUser.access_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       users[books[i].user_id] = response.data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  //   console.log('USERS:', users.length);
  // }, [books]);


  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.posts}>
          {books.map((book, user, index) => (
            <View>
              <Text style={styles.postedBy}>Posted By {user.first_name}</Text>
              <BookCard
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
                title={book.title}
                author={book.author}
                status={book.status}
                // onPress={navigation.navigate("Sale Post", { post: book }) }
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
