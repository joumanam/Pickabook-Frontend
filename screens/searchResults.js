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
import { TouchableOpacity } from "react-native-gesture-handler";


export default function SearchResults(props) {
  const imgWidth = Dimensions.get("screen").width * 0.5;
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState({});


  useEffect(() => {
    axios.get(`${API}/api/showallbooks`, {
      headers: {
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    })
    .then((response) => {
      console.warn(response.data);
      const stringifyId = response.data.map(book => {
        return {...book, user_id: book.user_id.toString()}
      })
      setBooks(stringifyId);
    })
    .catch((err) => {
      console.log(err);
    });

    axios.get(`${API}/api/showallusers`, {
      headers: {
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    })
    .then((response) => {
      // console.warn('CURRENT USER', currentUser);
      let usersDict = {}
      response.data.map(user => {
        let stringId = user.id;
        stringId = stringId.toString();
        usersDict[stringId] = user;
      })
      console.warn('USERS', usersDict);
      setUsers(usersDict);
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

const onPress = (post, user) => {
 if (post.status === "For Trade") props.navigation.navigate('Trade Post', {post: books, user})
 if (post.status === "For Sale") props.navigation.navigate('Sale Post', {post: books, user})
 if (post.status === "For Auction") props.navigation.navigate('Auction Post', {post: books, user})
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
