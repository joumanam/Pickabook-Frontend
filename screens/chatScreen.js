import React, { useState, useEffect } from "react";
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

  const [stories, setStories] = useState([]);

  const [messages, setMessages] = useState([
    {
      userImage: "https://randomuser.me/api/portraits/men/72.jpg",
      userName: "Robert Henry",
      message: {
        sender: "Robert Henry",
        text: "Hello",
        seenByYou: true,
        seenByUser: true,
      },
      isTyping: true,
      time: "now",
    },
    {
      userImage: "https://randomuser.me/api/portraits/women/81.jpg",
      userName: "Sophie Price",
      message: {
        sender: "You",
        text: "Is it still available?",
        seenByYou: true,
        seenByUser: false,
      },
      time: "03:32 PM",
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/33.jpg",
      userName: "Jessie Collins",
      message: {
        sender: "You",
        text: "It's used but in good condition. You still want it?",
        seenByYou: true,
        seenByUser: true,
      },
      time: "01:40 PM",
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/85.jpg",
      userName: "Clinton Meyer",
      message: {
        sender: "Clinton Meyer",
        text: "Let me know, what you think?",
        seenByYou: false,
        seenByUser: false,
      },
      time: "10:37 AM",
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/60.jpg",
      userName: "Brayden Willis",
      message: {
        sender: "Brayden Willis",
        text: "Okay, will share it with you by Friday.",
        seenByYou: true,
        seenByUser: true,
      },
      time: "Yesterday",
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/47.jpg",
      userName: "Dennis Brown",
      message: {
        sender: "Dennis Brown",
        text: "Yes I received the book! Thank you so much!",
        seenByYou: true,
        seenByUser: true,
      },
      time: "3 days ago",
    },
    {
      userImage: "https://randomuser.me/api/portraits/women/21.jpg",
      userName: "Dolores Bell",
      message: {
        sender: "You",
        text: "Thanks!",
        seenByYou: true,
        seenByUser: true,
      },
      time: "4 days ago",
    },
    {
      userImage: "https://randomuser.me/api/portraits/men/54.jpg",
      userName: "Everett Green",
      message: {
        sender: "Everett Green",
        text: "I am not sure about that.",
        seenByYou: true,
        seenByUser: true,
      },
      time: "one month ago",
    },
  ]);

  const [currentStoryView, setCurrentStoryView] = useState(stories);
  const [storyModalVisible, setStoryModalVisible] = useState(false);

  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View >
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
      >
        
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       
        {/* Chats View */}
        <View style={{ flex: 1 }}>
          {messages.map((chat) => (
            <TouchableOpacity
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
              onPress={()=>{
                props.navigation.navigate("Chat Window")
              }}
              onLongPress={() => {
                Alert.alert(
                  "Delete Chat?",
                  `Do you want to delete ${chat.userName}'s chats?`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "Yes",
                      onPress: () => {
                        let newChats = messages.filter(
                          (m) => m.userName !== chat.userName
                        );
                        setMessages(newChats);
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  let chatStory = stories.filter(
                    (story) => story.userName === chat.userName
                  );
                  if (chatStory.length > 0) {
                    setCurrentStoryView(chatStory);
                    setStoryModalVisible(true);
                  }
                }}
              >
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    borderWidth:
                      stories.filter(
                        (story) => story.userName === chat.userName
                      ).length > 0
                        ? 4
                        : null,
                    borderColor:
                      stories.filter(
                        (story) => story.userName === chat.userName
                      ).length > 0
                        ? "#3c40c6"
                        : null,
                  }}
                  source={{
                    uri: chat.userImage,
                  }}
                />
              </TouchableOpacity>
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
                    {chat.userName}
                  </Text>
                  <Text style={{ fontFamily: "NSRegular", fontSize: 14 }}>
                    {chat.time}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {chat.isTyping ? (
                    <Text
                      style={{
                        fontFamily: "NSRegular",
                        color: "green",
                        fontSize: 16,
                      }}
                    >
                      typing...
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily:
                          chat.message.sender !== "You"
                            ? chat.message.seenByYou
                              ? "NSRegular"
                              : "NSBold"
                            : "NSRegular",
                        fontSize: 16,
                      }}
                    >
                      {chat.message.text}
                    </Text>
                  )}
                  {chat.message.sender === "You" ? (
                    chat.message.seenByUser ? (
                      <MIcon name="done-all" size={16} color="#3c40c6" />
                    ) : (
                      <MIcon name="done" size={16} color={"#555"} />
                    )
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  storiesView: {
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: "#fafafa",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  storyContentView: {
    width: 90,
    height: 130,
    borderRadius: 10,
    borderColor: "#dfe4ea",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
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
