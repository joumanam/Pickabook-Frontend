import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import AddButton from "./addButton";
import DropDownPicker from "react-native-dropdown-picker";
import UploadImage from "./uploadImage";
import { Rating } from "react-native-ratings";
import axios from "axios";

export default function AddEventComponent(props) {


  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comments, setComments] = useState("");
 
  const changeHandlerName = (val) => {
    setEventName(val);
  };
  const changeHandlerLocation = (val) => {
    setLocation(val);
  };
  const changeHandlerDate = (val) => {
    setDate(val);
  };
  const changeHandlerTime = (val) => {
    setTime(val);
  };
  const changeHandlerComments = (val) => {
    setComments(val);
  };

  const onSubmit = () => {
    const data = {
      name: eventName,
      location,
      date: '2021-11-07',
      time: '23:21:00',
      image_url: 'http://www.sljeunesse.fr/wp-content/uploads/2019/04/20e-salon-livre-jeunesse-FLPEJR-2019.jpg',
      comments,
      coordinates: JSON.stringify(props.coordinates),
      user_id: props.user.user.id
    }

    axios
    .post("http://192.168.43.140:8000/api/addevent", data, {
      headers: {
        Authorization: `Bearer ${props.user.access_token}`,
      },
    })
    .then((response) => {
      console.log("From component axios", response.data);
    }).catch((err) => {
      console.log("From component axios, error", err);
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {" "}
          Please fill the fields below {"\n"}
        </Text>
        <UploadImage />
        <Text style={styles.titles}> Title: </Text>
        <TextInput
          style={styles.input}
          placeholder="Event Name"
          onChangeText={changeHandlerName}
        />
        <Text style={styles.titles}> Location: </Text>

        <TextInput
          style={styles.input}
          placeholder="Location"
          onChangeText={changeHandlerLocation}
        />

        <Text style={styles.titles}> Date: </Text>

        <TextInput
          style={styles.input}
          placeholder="Category"
          onChangeText={changeHandlerDate}
        />
        <Text style={styles.titles}> Time: </Text>

        <TextInput
          style={styles.input}
          placeholder="Condition"
          onChangeText={changeHandlerTime}
        />
        <Text style={styles.titles}> Additional Information: </Text>

        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Additional Information"
          onChangeText={changeHandlerComments}
        />
       
        <AddButton
          title="Add New Event"         
          onPress={() => onSubmit()} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  titles: {
    fontWeight: "bold",
  },
});
