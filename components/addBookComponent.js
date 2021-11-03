import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
import { StyleSheet, Text, View, Alert, TextInput } from "react-native";
import AddButton from "./addButton";
import DropDownPicker from "react-native-dropdown-picker";
import UploadImage from "./uploadImage";
import { Rating } from "react-native-ratings";

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
  const [image, setImage] = useState('');

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
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {" "}
          Please fill the fields below {"\n"}
        </Text>
        <UploadImage image={image} setImage={setImage}/>
        <Text style={styles.titles}> Title: </Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          onChangeText={changeHandlerTitle}
        />
        <Text style={styles.titles}> Author: </Text>

        <TextInput
          style={styles.input}
          placeholder="Author"
          onChangeText={changeHandlerAuthor}
        />

        <Text style={styles.titles}> Category: </Text>

        <TextInput
          style={styles.input}
          placeholder="Category"
          onChangeText={changeHandlerCategory}
        />
        <Text style={styles.titles}> Condition: </Text>

        <TextInput
          style={styles.input}
          placeholder="Condition"
          onChangeText={changeHandlerCondition}
        />
        <Text style={styles.titles}> Language: </Text>

        <TextInput
          style={styles.input}
          placeholder="Language"
          onChangeText={changeHandlerLanguage}
        />
        <Text style={styles.titles}> Rating: </Text>

        <Rating
          startingValue={0}
          fractions={2}
          onFinishRating={(rating) => {
            Alert.alert("Star Rating: " + JSON.stringify(rating));
          }}
          style={{ paddingVertical: 10, alignSelf: "flex-start" }}
          imageSize={30}
        />

        <Text style={styles.titles}> Price: </Text>

        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={changeHandlerPrice}
        />
        <Text style={styles.titles}> Status: {"\n"}</Text>

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
            props.submitHandler({
              bookTitle,
              author,
              status,
              category,
              condition,
              price,
              language,
              rating,
              image
            })
          }
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
