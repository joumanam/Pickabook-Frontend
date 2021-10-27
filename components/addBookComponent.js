import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AddButton from "./addButton";
import { cond } from "react-native-reanimated";
import DropDownPicker from "react-native-dropdown-picker";

export default function AddBookComponent({ props }) {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [dropDown, setDropDown] = useState([
    { id: "1", label: "For Sale", value: "For Sale" },
    { id: "2", label: "For Trade", value: "For Trade" },
    { id: "3", label: "For Auction", value: "For Auction" },
    { id: "4", label: "Idle", value: "Idle" },
  ]);

  const changeHandlerTitle = (val) => {
    setBookTitle(val);
  };
  const changeHandlerAuthor = (val) => {
    setAuthor(val);
  };
  const changeHandlerStatus = (val) => {
    setStatus(val);
  };
  const changeHandlerCategory = (val) => {
    setCategory(val);
  };
  const changeHandlerCondition = (val) => {
    setCondition(val);
  };
  const changeHandlerRating = (val) => {
    setRating(val);
  };
  const changeHandlerLanguage = (val) => {
    setLanguage(val);
  };
  const changeHandlerPrice = (val) => {
    setPrice(val);
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {" "}
        Please fill the fields below {"\n"}
      </Text>

      <Text> Title: </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={changeHandlerTitle}
      />
      <Text> Author: </Text>

      <TextInput
        style={styles.input}
        placeholder="Author"
        onChangeText={changeHandlerAuthor}
      />

      <Text> Category: </Text>

      <TextInput
        style={styles.input}
        placeholder="Category"
        onChangeText={changeHandlerCategory}
      />
      <Text> Condition: </Text>

      <TextInput
        style={styles.input}
        placeholder="Condition"
        onChangeText={changeHandlerCondition}
      />
      <Text> Language: </Text>

      <TextInput
        style={styles.input}
        placeholder="Language"
        onChangeText={changeHandlerLanguage}
      />
      <Text> Rating: </Text>

      <TextInput
        style={styles.input}
        placeholder="Rating"
        onChangeText={changeHandlerRating}
      />
      <Text> Price: </Text>

      <TextInput
        style={styles.input}
        placeholder="Price"
        onChangeText={changeHandlerPrice}
      />
      <Text> Status: {"\n"}</Text>

      <View style={styles.dropDown}>
        <DropDownPicker
          style={{ backgroundColor: "white" }}
          open={open}
          value={value}
          items={dropDown}
          setOpen={setOpen}
          setValue={setValue}
          showTickIcon={false}
          setItems={setDropDown}
          dropDownDirection="AUTO"
          placeholder="Select Status"
          placeholderStyle={{
            color: "black",
            fontWeight: "bold",
          }}
        />
      </View>

      <AddButton
        title="Add New Book"
        onPress={() =>
          props.submitHandler(
            bookTitle,
            author,
            status,
            category,
            condition,
            price,
            language,
            rating
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
