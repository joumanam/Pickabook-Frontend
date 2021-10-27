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

export default function AddWishlist({props}) {

    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');


    const changeHandlerTitle = (val) => {
        setBookTitle(val);
    }
    const changeHandlerAuthor = (val) => {
        setAuthor(val);
    }

    return (
        <View>
            <TextInput 
                style={styles.input}
                placeholder="Book Title"
                onChangeText={changeHandlerTitle}
            />
              <TextInput 
                style={styles.input}
                placeholder="Book Author"
                onChangeText={changeHandlerAuthor}
            />
            <AddButton title="Add New Book" onPress={()=>props.submitHandler(bookTitle, author)} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
})