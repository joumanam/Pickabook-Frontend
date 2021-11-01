import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  LogBox,
  FlatList,
  CheckBox,
  Button,
  ImageBackground,
  Modal,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import DropDownPicker from "react-native-dropdown-picker";
import AddButton from "../components/addButton";
import SearchBar from "../components/searchBar";
import { userContext } from "../userContext";
import { AuthStack } from "../App";

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";



export default function BrowseScreen({ navigation }) {
  const [dropDownDisabled, setDropDownDisabled] = useState(true);
  const { currentUser, setCurrentUser } = useContext(userContext);

  const statusOptions = [
    { id: "1", label: "For Sale", value: "For Sale" },
    { id: "2", label: "For Trade", value: "For Trade" },
    { id: "3", label: "For Auction", value: "For Auction" },
  ];
  
  const filterOptions = [
    { id: "1", txt: "Search by Title", path: "searcht", isChecked: true },
    { id: "2", txt: "Search by Author", path: "searcha", isChecked: false },
    { id: "3", txt: "Search by Language", path: "searchl", isChecked: false },
    { id: "4", txt: "Search by Status", path: "searchs", isChecked: false },
  ];

  const [filters, setFilters] = useState(filterOptions);

  const handleChange = (id) => {
    if (id === "4") {
      setOpen(false);
      setDropDownDisabled(!dropDownDisabled);
    }
    let temp = filters.map((filter) => {
      if (id === filter.id) {
        return { ...filter, isChecked: !filter.isChecked };
      }
      return filter;
    });
    setFilters(temp);
  };

  const [search, setSearch] = useState();
  const [searchLang, setSearchLang] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <View>
            <Card style={{ margin: 5 }}>
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <CheckBox
                    value={item.isChecked}
                    onChange={() => {
                      handleChange(item.id);
                    }}
                  />
                  <Text style={styles.text}>{item.txt}</Text>
                </View>
              </View>
            </Card>
            {item.id === "3" && item.isChecked && (
              <TextInput
                style={styles.languageInput}
                value={searchLang}
                placeholder="Type Language"
                onChangeText={(text) => {
                  setSearchLang(text);
                }}
              />
            )}
          </View>
        )}
      />
    );
  };

  function updateSearch(search) {
    setSearch(search);
  }

  const handleSubmit = () => {};

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never"]);
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(["Bottom Tab Navigator: 'tabBarOptions’ is deprecated"]);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/myimages/download.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
      >
        <ScrollView>
          <HeaderWithoutLogo title="Browse" />
          <View style={{ padding: 8 }}>{renderFlatList(filters)}</View>

          <View style={styles.dropDown}>
            <DropDownPicker
              style={{
                backgroundColor: dropDownDisabled
                  ? "rgba(100,100,100,0.5)"
                  : "white",
              }}
              open={open}
              value={status}
              items={statusOptions}
              setOpen={setOpen}
              setValue={setStatus}
              showTickIcon={false}
              disabled={dropDownDisabled}
              setItems={setStatus}
              dropDownDirection="AUTO"
              placeholder="Select Status"
              placeholderStyle={{
                color: dropDownDisabled ? "grey" : "black",
                fontWeight: "bold",
              }}
            />
          </View>
          <View style={{ padding: 9 }}>
            <View
              style={{
                backgroundColor: "#710D0D",
                marginTop: 170,
                borderRadius: 5,
              }}
            >
              <SearchBar
                value={search}
                updateSearch={updateSearch}
                style={{}}
              />
            </View>
            <View style={{marginBottom: 5}}>
              <AddButton
                title="Search"
                onPress={() => navigation.navigate("Search Results", {data: {filters, status, search, searchLang}})}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    // padding: 8,
    // marginBottom: 20,
  },

  card: {
    padding: 10,
    // margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    textAlign: 'left' ,
    alignSelf: 'center',

    fontWeight: "bold",
  },
  dropDown: {
    marginTop: 7,
    padding: 8,
  },
  languageInput: {
    marginLeft: 10,
    height: 40,
    // fontStyle: 'italic',
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
