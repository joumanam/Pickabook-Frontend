import React from "react";
import { Icon } from "react-native-elements";
import { StyleSheet, Alert, TouchableOpacity } from "react-native";

export default function DeleteButton({onPress}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="trash" type="font-awesome" color="#710D0D" size={26} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        alignSelf: 'flex-end',
        width: 30,
        borderColor: "#710D0D",
        paddingHorizontal: 2,
        paddingVertical: 6,
        borderRadius: 4
    }
})