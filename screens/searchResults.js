import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  CheckBox,
  Button,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import DropDownPicker from "react-native-dropdown-picker";
import HeaderWithoutLogo from "../components/headerWithoutLogo";

// You can import from local files

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

const data = [
  { id: "1", txt: "Search by Title", isChecked: false },
  { id: "2", txt: "Search by Author", isChecked: false },
  { id: "3", txt: "Search by Language", isChecked: false },
  { id: "4", txt: "Search by Status", isChecked: false },
];

export default function SearchResults() {
  const [products, setProducts] = useState(data);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState([
    { id: "1", label: "For Sale", value: "For Sale" },
    { id: "2", label: "For Trade", value: "For Trade" },
    { id: "3", label: "For Auction", value: "For Auction" },
    { id: "4", label: "All the above", value: "All the above" },
  ]);

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

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
                  checkedColor="red"
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

  return (
    <View style={styles.container}>
      <HeaderWithoutLogo title="Search Results" />

      <View >
          
          <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
          <View style={styles.dropDown}>
            <DropDownPicker
              open={open}
              value={value}
              items={status}
              setOpen={setOpen}
              setValue={setValue}
              showTickIcon={false}
              searchable={true}
              setItems={setStatus}
              placeholder="Select Status"
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
            />
            <TextInput
            defaultValue={search}
            style={styles.input}
            placeholder="Search"
            textContentType="name"
            onChangeText={(value) => setSearch(value)}
            returnKeyType="search"
          />
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  input: {
    //   borderColor: 'red'
  },
  card: {
    padding: 10,
    // margin: 5,
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
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropDown: {
    height: 500,
  },
  searchView: {
    display: "flex",
    flexDirection: "row",
    width: "150%",
  },
  //   inputView: {
  //     flex: 1,
  //     height: 40,
  //     backgroundColor: "#dfe4ea",
  //     paddingHorizontal: 10,
  //     borderRadius: 6,
  //     display: "flex",
  //     flexDirection: "row",
  //     alignItems: "center",
  //   },
});
