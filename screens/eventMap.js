import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { Icon } from "react-native-elements";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import MapView from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FAB } from "react-native-paper";

export default function EventMap({ navigation }) {
  const [newMarker, setNewMarker] = useState(null);
  // newMarker goes in the coordinates column of the new post

  
  const onAddPin = (e) => {
    console.log(e.nativeEvent.coordinate);
    setNewMarker(e.nativeEvent.coordinate);
  };

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
        <HeaderWithoutLogo title="Events" />
        <MapView
          style={styles.map}
          // loadingEnabled={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onLongPress={(e) => onAddPin(e)}
          initialRegion={{
            latitude: 33.94,
            longitude: 35.6,
            latitudeDelta: 0.6,
            longitudeDelta: 0.6,
          }}
        >          
          {newMarker && <MapView.Marker key="New Pin" coordinate={newMarker} />}
        </MapView>
          <FAB icon="plus" style={styles.fab} onPress={()=>navigation.navigate("Add Event")}/>
   

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    marginBottom: 20,
  },
  map: {
    alignSelf: "flex-start",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 79,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: 'green'
  }
});
