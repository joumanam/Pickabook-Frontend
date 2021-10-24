import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import DropDownPicker from "react-native-dropdown-picker";
import AddButton from "../components/addButton";
import SearchBar from "../components/searchBar";

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

const data = [
  { id: "1", txt: "Search by Title", isChecked: false },
  { id: "2", txt: "Search by Author", isChecked: false },
  { id: "3", txt: "Search by Language", isChecked: false },
  { id: "4", txt: "Search by Status", isChecked: false },
];



export default function BrowseScreen() {
  const [products, setProducts] = useState(data);

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };
  const [search, setSearch] = useState();
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState([
    { id: "1", label: "For Sale", value: "For Sale" },
    { id: "2", label: "For Trade", value: "For Trade" },
    { id: "3", label: "For Auction", value: "For Auction" },
    { id: "4", label: "All the above", value: "All the above" },
  ]);

  // let selected = products.filter((product) => product.isChecked);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
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
                <Text>{item.txt}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  function updateSearch(search) {

  }

  return (

    <View style={styles.container}>
      <HeaderWithoutLogo title="Browse"/>
      <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
      <View style={styles.dropDown}>
        <DropDownPicker
          open={open}
          value={value}
          items={status}
          setOpen={setOpen}
          setValue={setValue}
          showTickIcon={false}
          // searchable={true}
          setItems={setStatus}
          dropDownDirection="AUTO"
          placeholder="Select Status"
          placeholderStyle={{
            color: "grey",
            fontWeight: "bold",
          }}
        />
      </View>
      <View style={{ backgroundColor: "#710D0D", marginTop: 10, borderRadius: 5 }}>
        <SearchBar 
        value={search} 
        updateSearch={updateSearch} 
        style={{}} />
      </View>
      <View>
        <AddButton title="Search" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  headerContainer: {
    flex: 1,
    // backgroundColor: "white",
    marginBottom: 20,
  },
  card: {
    padding: 10,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
