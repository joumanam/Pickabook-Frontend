import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import MapView from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { userContext } from "../userContext";
import axios from "axios";

export default function EventMap({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(userContext);

  const [allPosts, setAllPosts] = useState([]);
  const [addReady, setAddReady] = useState(false);
  const [newMarker, setNewMarker] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.43.140:8000/api/showallevents", {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setAllPosts(response.data);
      });
  }, []);

  const onPressAdd = () => {
    setAddReady(true);
    ToastAndroid.showWithGravityAndOffset(
      "Long press a location to add pin",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      -50,
      270
    );
  };

  const onPressCancel = () => {
    setAddReady(false);
    setNewMarker(null);
  };

  const onAddPin = (e) => {
    // console.log(JSON.stringify(e.nativeEvent.coordinate));
    if (addReady) setNewMarker(e.nativeEvent.coordinate);
  };

  const onConfirmPin = () => {
    navigation.navigate("Add Event", { coordinates: newMarker, user: currentUser });
    setAddReady(false);
    setNewMarker(null);
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

        {allPosts && allPosts.map((marker, index) => (
          <MapView.Marker
            key={marker["id"]}
            coordinate={JSON.parse(marker["coordinates"])}
           
            onPress={() => console.log(marker)}   // to use later to show pinned posts 
          />
        ))}

        {newMarker && <MapView.Marker key="New Pin" coordinate={newMarker} />}
      </MapView>
      {currentUser.user.role === "Admin" &&
        (addReady ? (
          newMarker ? (
            <View style={styles.fabCheck}>
              <FAB
                icon="check"
                style={styles.confirm}
                onPress={() => onConfirmPin()}
              />
              <FAB
                icon="delete"
                style={styles.cancel}
                onPress={() => onPressCancel()}
              />
            </View>
          ) : (
            <FAB
              icon="delete"
              style={{ ...styles.fab, backgroundColor: "#db0f0f" }}
              onPress={() => onPressCancel()}
            />
          )
        ) : (
          <FAB icon="plus" style={styles.fab} onPress={() => onPressAdd()} />
        ))}
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
    position: "absolute",
    right: 20,
    bottom: 50,
    backgroundColor: "#710D0D",
  },
  fabCheck: {
    position: "absolute",
    right: 20,
    bottom: 50,
  },
  confirm: {
    marginBottom: 10,
    backgroundColor: "green",
  },
  cancel: {
    backgroundColor: "#db0f0f",
  },
});
