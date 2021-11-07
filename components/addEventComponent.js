import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import { StyleSheet, Text, View, Alert, TextInput, Button } from "react-native";
import AddButton from "./addButton";
import DropDownPicker from "react-native-dropdown-picker";
import UploadImage from "./uploadImage";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Rating } from "react-native-ratings";
import axios from "axios";
import API from '../assets/API';

export default function AddEventComponent(props) {
  const [hasDateBeenSet, setHasDateBeenSet] = useState(false);
  const [hasTimeBeenSet, setHasTimeBeenSet] = useState(false);

  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [comments, setComments] = useState("");
  const nav = props.navigation;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const changeHandlerName = (val) => {
    setEventName(val);
  };

  const changeHandlerLocation = (val) => {
    setLocation(val);
  };

  const changeHandlerTime = (val) => {
    setTime(val);
  };

  const changeHandlerComments = (val) => {
    setComments(val);
  };
  // For the Date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
    setHasDateBeenSet(true);
  };

  // For the Time
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setTime(time);
    hideTimePicker();
    setHasTimeBeenSet(true);
  };
  // console.warn(time);

  const onSubmit = () => {
    const data = {
      name: eventName,
      location,
      date,
      time,
      image_url:
        "http://www.sljeunesse.fr/wp-content/uploads/2019/04/20e-salon-livre-jeunesse-FLPEJR-2019.jpg",
      comments,
      coordinates: JSON.stringify(props.coordinates),
      user_id: props.user.user.id,
    };

    axios
      .post(`${API}/api/addevent`, data, {
        headers: {
          Authorization: `Bearer ${props.user.access_token}`,
        },
      })
      .then((response) => {
        console.log("From component axios", response.data);
      })
      .catch((err) => {
        console.log("From component axios, error", err);
      });

    if (data) props.nav();
  };

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
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

        {/* <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          onChangeText={changeHandlerDate}
        /> */}
        {hasDateBeenSet && (
          <Text style={styles.dateTime}>{date.toISOString().slice(0, 10)}</Text>
        )}
        {!hasDateBeenSet ? (
          <AddButton title="Pick A Date" onPress={showDatePicker} />
        ) : (
          <AddButton title="Edit" onPress={showDatePicker} />
        )}
        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
              <Text style={styles.titles}> {"\n"} Time: </Text>

        {hasTimeBeenSet && (
          <Text style={styles.dateTime}>Event starts at {addZero(time.getHours())}:{addZero(time.getMinutes())}</Text>
        )}
        {!hasTimeBeenSet ? (
          <AddButton title="Pick A Time" onPress={showTimePicker} />
        ) : (
          <AddButton title="Edit" onPress={showTimePicker} />
        )}

        <DateTimePicker
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
          is24Hour={true}
          
          
        />

        <Text style={styles.titles}> {"\n"} Additional Information: </Text>

        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="Additional Information"
          onChangeText={changeHandlerComments}
        />

        <AddButton title="Add New Event" onPress={() => onSubmit()} />
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
  dateTime: {
    fontSize: 15,
    justifyContent: "center",
    marginLeft: 3,
    fontStyle: "italic",
  },
});
