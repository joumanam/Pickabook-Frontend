import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import DeleteButton from "./deleteButton";
import { useFonts } from "expo-font";
import NSLight from "../assets/fonts/NunitoSans/NunitoSansLight.ttf";
import NSRegular from "../assets/fonts/NunitoSans/NunitoSansRegular.ttf";
import NSBold from "../assets/fonts/NunitoSans/NunitoSansBold.ttf";
import NSExtraBold from "../assets/fonts/NunitoSans/NunitoSansExtraBold.ttf";
import LoadingScreen from "../screens/loadingScreen";


export default function WishlistItems({ item, pressHandler, isMine }) {

  const [loaded] = useFonts({
    NSLight,
    NSRegular,
    NSBold,
    NSExtraBold,
  });
  
  if (!loaded) {
    return (
      <View>
        <LoadingScreen />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.item}>
        <Text style={{ fontFamily: 'NSBold' }}>Book Title: </Text>
        <Text style={{ fontFamily: 'NSLight' }}>
          {item.title}
          {"\n"}
        </Text>
        <Text style={{  fontFamily: 'NSBold' }}>Book Author: </Text>
        <Text style={{ fontFamily: 'NSLight' }}>{item.author}</Text>
        {isMine && (
          <DeleteButton
            onPress={() => {
              Alert.alert("WARNING", "Are you sure you want to delete this?", [
                { text: "Yes", onPress: () => pressHandler(item.key) },
                { text: "Cancel" },
              ]);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: "#f2f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20.00,
    
    elevation: 2,
  }
});
