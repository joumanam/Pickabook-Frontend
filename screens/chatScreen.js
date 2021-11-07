import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
} from "react-native";
import { Feather as Icon, MaterialIcons as MIcon } from "@expo/vector-icons";
import axios from "axios";
import API from "../assets/API";
import { db } from "../assets/firebase";
import LoadingScreen from "./loadingScreen";
import { userContext } from "../userContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  FieldValue,
  query, where, orderBy, getDoc
} from "@firebase/firestore";

// npm i @react-navigation/bottom-tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// expo install expo-font
import { useFonts } from "expo-font";
import NSLight from "../assets/fonts/NunitoSans/NunitoSansLight.ttf";
import NSRegular from "../assets/fonts/NunitoSans/NunitoSansRegular.ttf";
import NSBold from "../assets/fonts/NunitoSans/NunitoSansBold.ttf";
import NSExtraBold from "../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf";

import HeaderWithoutLogo from "../components/headerWithoutLogo";

export default function Chats(props) {
  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });

  const dummyUser = {
    userImage: "https://randomuser.me/api/portraits/men/54.jpg",
    userName: "Everett Green",
    message: {
      sender: "Everett Green",
      text: "I am not sure about that.",
      seenByYou: true,
      seenByUser: true,
    },
    time: "one month ago",
  }

  const {currentUser, setCurrentUser} = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const convsFolderPath = collection(db, currentUser.user.id.toString())
  const convsQuery = query(convsFolderPath, orderBy('creation', 'desc'));

  useEffect(() => {
    axios.get(`${API}/api/showallusers`, {
      headers: {
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    })
    .then((response) => {
      // console.warn('CURRENT USER', currentUser);
      let usersDict = {}
      response.data.map(user => {
        usersDict[user.id.toString()] = user;
      })
      console.warn('USERS', usersDict);
      setUsers(usersDict);
    })
    .catch((err) => {
      console.log(err);
    });

    const unsubscribe = onSnapshot(convsQuery, (querySnapshot) => {
      const parsedConvs = querySnapshot.docs.map((doc) => {
        return {...doc.data(), recipientId: doc.id};
      });
      console.log('Convs:', parsedConvs);
      setConversations(parsedConvs);
    });
    return () => unsubscribe();
  }, []);
  
  if (!loaded) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <View>
      <HeaderWithoutLogo title="Messages" />
      <View
        style={{
          // marginTop: Number(StatusBar.currentHeight),
          // backgroundColor: 'red',
          // paddingVertical: 20,
          paddingHorizontal: 10,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      ></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Chats View */}
        <View style={{ flex: 1 }}>
          {conversations.map((chat, index) => (
            <TouchableOpacity
              key={chat.recipientId}
              style={{
                marginTop: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fafafa",
                borderBottomWidth: 1,
                borderBottomColor: "#dfe4ea",
              }}
              onPress={() => {
                console.log("Conv with:", users[chat.recipientId]);
                props.navigation.navigate("Chat Window", {user: users[chat.recipientId]});
              }}
            >

              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                }}
                source={{
                  uri: users[chat.recipientId].image_url,
                }}
              />

              <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "NSBold",
                      fontSize: 18,
                    }}
                  >
                    {users[chat.recipientId].full_name}
                  </Text>
                  <Text style={{ fontFamily: "NSRegular", fontSize: 14 }}>
                    {`${chat.date.split('-')[0].slice(4,10)} - ${chat.date.split('-')[1]}`}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily:
                          chat.seen
                            ? "NSRegular"
                            : "NSBold",
                      fontSize: 16,
                    }}
                  >
                    {chat.message}
                  </Text>
                  
                    {!chat.seen ? (
                      <MIcon name="circle" size={16} color="#710D0D" />
                    ) : null}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "90%",
    borderRadius: 20,
    overflow: "hidden",
  },
});
