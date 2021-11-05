import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'


export default function UploadImage(props) {

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      console.warn(_image.uri);
      props.setImage_url(_image.uri);
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {props.image_url ? (
        <Image source={{ uri: props.image_url }} style={{ width: 200, height: 200 }} />
      ) : null}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}>
          <Text style={{fontWeight: 'bold'}}>{props.image_url ? "Edit Image" : "Upload Image"}</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    marginBottom: 10,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 3
  },
});
