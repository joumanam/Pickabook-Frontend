import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AddButton from "./addButton";
import { FAB } from "react-native-paper";
import { Rating } from "react-native-ratings";

export default function OfferPost(props) {
  const imgWidth = Dimensions.get("screen").width * 0.55;

  return (
    <View>
      <View style={styles.offerCard}>
          <TouchableOpacity>
        <Text
          style={{
            marginLeft: 30,
            fontWeight: "bold",
            fontStyle: "italic",
            marginBottom: 10,
          }}
        >
          Posted By
          
            <Text style={{ color: "blue" }}> Julien Hosri</Text>
       
        </Text>
        </TouchableOpacity>
        <Image
          style={{
            width: imgWidth,
            height: imgWidth,
            alignSelf: "center",
            marginBottom: 5,
          }}
          source={require("../assets/myimages/background.png")}
        />
        <View style={styles.inCardText}>
          <Text style={{ fontWeight: "bold" }}>Book Title: </Text>
          <Text>
            Title
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Book Author: </Text>
          <Text>
            Author
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Language: </Text>
          <Text>
            Language
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Category: </Text>
          <Text>
            Category
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Condition: </Text>
          <Text>
            Condition
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Rating: </Text>
          <Text>
            <Rating
              imageSize={20}
              readonly
              startingValue={3}
              style={styles.rating}
            />
            {"\n"}
          </Text>
        </View>
        <View style={styles.buttons}>
          {/* <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.responsetText}>ACCEPT</Text>
            </TouchableOpacity> */}
          <FAB icon="check" style={styles.accept} />
          {/* <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.responsetText}>REJECT</Text>
            </TouchableOpacity> */}
          <FAB icon="delete" style={styles.reject} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  offerCard: {
    padding: 16,
    marginTop: -20,
    marginBottom: 40,
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
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  accept: {
    backgroundColor: "green",
    marginRight: 15,
  },
  reject: {
    backgroundColor: "#db0f0f",
    marginLeft: 15,
  },
  inCardText: {
    marginLeft: 30,
  },
});
