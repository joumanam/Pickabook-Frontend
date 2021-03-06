import React from "react";
import { useState, useEffect, useContext } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import WishlistItems from "../components/wishlistItems";
import { FAB } from "react-native-paper";
import OfferPost from "../components/OfferPost";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { userContext } from "../userContext";

import axios from "axios";
import API from "../assets/API";

export default function ViewOffers(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;
  const nav = props.navigation;
  const currentTrade = props.route.params.trade;
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [offers, setOffers] = useState({});
  const [books, setBooks] = useState({});

  const [offer, setOffer] = useState([
    {
      user: "Roxy Cat",
      title: "Caligula",
      author: "Albert Camus",
      language: "French",
      category: "Theatre, Literature",
      condition: "New",
      image:
        "https://world.openfoodfacts.org/images/products/978/207/036/0642/front_fr.3.full.jpg",
      rating: "4",
      key: "2",
    },
    {
      user: "Yvona Nehme",
      title: "Death on the Nile",
      author: "Agatha Christie",
      language: "English",
      category: "Thriller, mystery",
      condition: "Very good",
      image: "https://i.ebayimg.com/images/g/xp8AAOSwVPFfi25V/s-l300.jpg",
      rating: "4",
      key: "3",
    },
  ]);

  // console.log(currentTrade);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/api/showoffers/${currentTrade[0].id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      })
      .then((response) => {
        const temp = response.data;
        setOffers(temp);
      });
  }, []);

  console.log(offers);
  // console.log(books);

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderWithoutLogo title="Offers" />
        <View style={styles.content}>
          <View style={styles.list}>
            <FlatList
              style={styles.flatList}
              data={offer}
              renderItem={({ item }) => <OfferPost item={item} />}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
    flexDirection: "column",
  },
});
