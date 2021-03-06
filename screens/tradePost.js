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
import { Rating } from "react-native-ratings";
import axios from "axios";
import API from "../assets/API";
import ThemedListItem from "react-native-elements/dist/list/ListItem";

export default function TradePost(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;
  const nav = props.navigation;

  const { currentUser, setCurrentUser } = useContext(userContext);
  const currentPost = props.route.params.post;
  const [trade, setTrade] = useState({});

  const getTrade = () => {
    axios
      .get(`${API}/api/showtrades/${currentPost.id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      })
      .then((response) => {
        const temp = response.data;
        setTrade(temp);
      });
  }

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
            borderWidth: 1,
            borderColor: 'black'
            }}
            resizeMode="contain"
            source={{
              uri: currentPost.image_url,
            }}
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
            <Rating
              imageSize={20}
              readonly
              startingValue={currentPost.rating}
              style={styles.rating}
            />
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
              onPress={() => nav.navigate("View Offers", { trade: trade })}
            />
          )}
        </View>
      </View>
    );
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    getTrade();
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderWithoutLogo title="For Trade" />
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
