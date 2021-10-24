import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
  ScrollView
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
  const [dropDownDisabled, setDropDownDisabled] = useState(true); 

  const handleChange = (id) => {
    if(id  === '4') {
      setOpen(false)
      setDropDownDisabled(!dropDownDisabled)
    }
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };
  const [search, setSearch] = useState();
  const [searchLang, setSearchLang] = useState('');
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
                <Text>{item.txt}</Text>
              </View>
            </View>
          </Card>
          { (item.id === '3' && item.isChecked) &&
          <TextInput 
          style={styles.languageInput}
          value={searchLang}
          placeholder="Type Language"
          onChangeText={(text) => {
            setSearchLang(text);
          }}  
         />}

          </View>
        )}
      />
    );
  };

  function updateSearch(search) {
    
  }

  const handleSubmit = () => {
    let result = [];

  } 
  

  return (
    <ScrollView>
    <View style={styles.container}>
      <HeaderWithoutLogo title="Browse"/>
      <View>{renderFlatList(products)}</View>
      
      <View style={styles.dropDown}>
        <DropDownPicker style={{backgroundColor: dropDownDisabled ? 'rgba(100,100,100,0.5)' : 'white'}}
        
          open={open}
          value={value}
          items={status}
          setOpen={setOpen}
          setValue={setValue}
          showTickIcon={false}
          disabled={dropDownDisabled}
          setItems={setStatus}
          dropDownDirection="AUTO"
          placeholder="Select Status"
          placeholderStyle={{
            color: dropDownDisabled ? 'grey' : 'black',
            fontWeight: "bold",
          }}
        />
      </View>
      <View style={{ backgroundColor: "#710D0D", marginTop: 170, borderRadius: 5 }}>
        <SearchBar 
        value={search} 
        updateSearch={updateSearch} 
        style={{}} />
      </View>
      <View>
        <AddButton title="Search" onPress={handleSubmit}/>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
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
  dropDown: {
    marginTop: 7
  },
  languageInput: {
    marginLeft: 10,
    height: 40,
    // fontStyle: 'italic',
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  }
});
