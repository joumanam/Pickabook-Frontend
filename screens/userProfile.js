import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  LogBox,
  Dimensions,
} from "react-native";
import BookCard from "../components/bookCard";
import { Feather as Icon } from "@expo/vector-icons";
import axios from "axios";
// Fonts
import { useFonts } from "expo-font";
import SSLight from "../assets/fonts/SourceSansPro/SourceSansProLight.ttf";
import SSRegular from "../assets/fonts/SourceSansPro/SourceSansProRegular.ttf";
import SSBold from "../assets/fonts/SourceSansPro/SourceSansProBold.ttf";
import API from "../assets/API";
import { userContext } from "../userContext";

export default function UserProfile(props) {
  const [loaded] = useFonts({
    SSLight,
    SSRegular,
    SSBold,
  });

  useEffect(() => {
    LogBox.ignoreLogs(
      ["VirtualizedLists should never be nested inside"],
      ["Each child in a list"]
    );
  }, []);

  const [user, setUser] = useState({});
  const currentUserId = props.route.params.userId;
  const { currentUser, setCurrentUser } = useContext(userContext);

  console.log("current user is:", currentUserId);

  useEffect(() => {
    axios
      .get(`${API}/api/show/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      })
      .then((response) => {
        const temp = response.data;
        setUser(temp);
      });
  }, []);

  console.log(user);

  const [showContent, setShowContent] = useState("ForSale");

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  function ForSale({ photos }) {
    const imgWidth = Dimensions.get("screen").width * 0.5;
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {photos.map((photo, index) => (
            <View>
              <BookCard
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
                title={photo.title}
                author={photo.author}
                status={photo.status}
                image_url={photo.image_url}
                onPress={() =>
                  props.navigation.navigate("Sale Post", { post: photo })
                }
                style={{ width: imgWidth, height: imgWidth }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  function ForTrade({ photos }) {
    const imgWidth = Dimensions.get("screen").width * 0.5;
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {photos.map((photo, index) => (
            <View>
              <BookCard
                title={photo.title}
                author={photo.author}
                status={photo.status}
                image_url={photo.image_url}
                onPress={() =>
                  props.navigation.navigate("Trade Post", { post: photo })
                }
                style={{ width: imgWidth, height: imgWidth }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  function ForAuction({ photos }) {
    const imgWidth = Dimensions.get("screen").width * 0.5;
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {photos.map((photo, index) => (
            <View>
              <BookCard
                key={photo.id}
                title={photo.title}
                author={photo.author}
                status={photo.status}
                image_url={photo.image_url}
                onPress={() =>
                  props.navigation.navigate("Auction Post", { post: photo })
                }
                style={{ width: imgWidth, height: imgWidth }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={require("../assets/myimages/background.png")}
            />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: user.image_url,
                  }}
                />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{user.full_name}</Text>
              </View>
              {/* Posts/Followers/Following View */}
              <View style={styles.countsView}>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>13</Text>
                  <Text style={styles.countText}>Books</Text>
                </View>
                <View style={styles.countView}>
                  <Text style={styles.countNum}>5</Text>
                  <Text style={styles.countText}>Wishlist</Text>
                </View>
              </View>
              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity
                  style={styles.interactButton}
                  onPress={() => props.navigation.navigate("User Wishlist")}
                >
                  <Text style={styles.interactButtonText}>View Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: "white",
                    borderWidth: 2,
                    borderColor: "#710D0D",
                  }}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: "#710D0D" }}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Profile Content */}

            <View style={{ marginTop: 20 }}>
              <View style={styles.profileContentButtonsView}>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === "ForSale" ? 2 : 0,
                  }}
                  onPress={() => setShowContent("ForSale")}
                >
                  <Text style={styles.showContentButtonText}>Sale</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === "ForTrade" ? 2 : 0,
                  }}
                  onPress={() => setShowContent("ForTrade")}
                >
                  <Text style={styles.showContentButtonText}>Trade</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.showContentButton,
                    borderBottomWidth: showContent === "ForAuction" ? 2 : 0,
                  }}
                  onPress={() => setShowContent("ForAuction")}
                >
                  <Text style={styles.showContentButtonText}>Auction</Text>
                </TouchableOpacity>
               
              </View>

              {user.books && (
                <View>
                  {showContent === "ForSale" ? (
                    <ForSale
                      photos={user.books.filter((book, index) => {
                        if (book.status === "For Sale") return book;
                      })}
                    />
                  ) : showContent === "ForTrade" ? (
                    <ForTrade
                      photos={user.books.filter((book, index) => {
                        if (book.status === "For Trade") return book;
                      })}
                    />
                  ) : (
                    <ForAuction
                      photos={user.books.filter((book, index) => {
                        if (book.status === "For Auction") return book;
                      })}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 250, width: "100%" },
  profileContainer: {
    // height: 1000,
    backgroundColor: "#fff",
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: "center", marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#710D0D",
  },
  nameAndBioView: { alignItems: "center", marginTop: 10 },
  userFullName: { fontFamily: "SSBold", fontSize: 26 },

  countsView: { flexDirection: "row", marginTop: 20 },
  countView: { flex: 1, alignItems: "center" },
  countNum: { fontFamily: "SSBold", fontSize: 20 },
  countText: { fontFamily: "SSRegular", fontSize: 18, color: "#333" },
  interactButtonsView: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#710D0D",
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    fontFamily: "SSBold",
    color: "#fff",
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#f1f3f6",
  },
  showContentButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#000",
  },
  showContentButtonText: {
    fontFamily: "SSRegular",
    fontSize: 18,
    fontWeight: "bold",
  },
});
