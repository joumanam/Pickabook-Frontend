import React from "react";
import { useState, useEffect, useContext } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";

import {
  StyleSheet,
  View,
  Alert,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { userContext } from "../userContext";
import { db } from "../assets/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy, 
} from "@firebase/firestore";


export default function NotificationsScreen() {

  const [notifications, setNotifications] = useState([]);
  const { currentUser, setCurrentUser } = useContext(userContext);


  const notificationsFolderPath = collection(db, "Notifications", currentUser.user.id.toString(), "Notifications")
  const notificationsQuery = query(notificationsFolderPath, orderBy("creation", "desc"));

  useEffect(() => {
    const unsubscribe = onSnapshot(notificationsQuery, (querySnapshot) => {
      const parsedNotifications = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      if (parsedNotifications.length > 0) {
      setNotifications(parsedNotifications)
      }
    });
    return () => unsubscribe();
  }, []);

  const pressHandler = (key) => {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter(
        (notification) => notification.key != key
      );
    });
  };

  const txtWidth = Dimensions.get("screen").width * 0.72;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/myimages/download.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
      >
        <ScrollView>
          <HeaderWithoutLogo title="Notifications" />
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => {
              return item.creation.toString();
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.notif}>
                  <Image source={{uri: item.post.image_url}} style={{height: 45, width: 45}}/>
                  <Text style={{ fontWeight: "bold", width: txtWidth, marginLeft: 10 }}>
                    {item.name} has outbid you!
                  </Text>

                  <TouchableOpacity>
                   
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notif: {
    flex: 1,
    width: "85%",
    height: "100%",
    padding: 15,
    backgroundColor: "#f0f2f5",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 15,
    shadowColor: "black",
    elevation: 8,
    borderRadius: 5,
  },
});
