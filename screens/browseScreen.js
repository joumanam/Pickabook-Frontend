import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  LogBox,
  ImageBackground,

} from "react-native";
import Constants from "expo-constants";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import DropDownPicker from "react-native-dropdown-picker";
import AddButton from "../components/addButton";
import SearchBar from "../components/searchBar";
import { userContext } from "../userContext";

import axios from "axios";
import API from '../assets/API';

export default function BrowseScreen({ navigation }) {
  const [dropDownDisabled, setDropDownDisabled] = useState(true);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [users, setUsers] = useState({});

  const statusOptions = [
    { id: "1", label: "No Filtering", value: "No Filter" },
    { id: "2", label: "For Sale", value: "For Sale" },
    { id: "3", label: "For Trade", value: "For Trade" },
    { id: "4", label: "For Auction", value: "For Auction" },
  ];

  const filterOptions = [
    // { id: "1", txt: "Search by Title", path: "searcht", isChecked: true },
    // { id: "2", txt: "Search by Author", path: "searcha", isChecked: false },
    // { id: "3", txt: "Search by Language", path: "searchl", isChecked: false },
    // { id: "4", txt: "Search by Status", path: "searchs", isChecked: false },
  ];

  const [filters, setFilters] = useState(filterOptions);

  const handleChange = () => {
    // if (id === "4") {
    setOpen(false);
    setDropDownDisabled(!dropDownDisabled);

    let temp = filters.map((filter) => {
      if (id === filter.id) {
        return { ...filter, isChecked: !filter.isChecked };
      }
      return filter;
    });
    setFilters(temp);
  };
  

  const [search, setSearch] = useState("");
  const [searchLang, setSearchLang] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('No Filter');

  // const renderFlatList = (renderData) => {
  //   return (
  //     <FlatList
  //       data={renderData}
  //       renderItem={({ item }) => (
  //         <View>
  //           <Card style={{ margin: 5 }}>
  //             <View style={styles.card}>
  //               <View
  //                 style={{
  //                   flexDirection: "row",
  //                   flex: 1,
  //                   justifyContent: "space-between",
  //                 }}
  //               >
  //                 <Text style={styles.text}>{item.txt}</Text>

  //                 <CheckBox
  //                   value={item.isChecked}
  //                   tintColors={{ true: '#710D0D', false: 'black' }}
  //                   onChange={() => {
  //                     handleChange(item.id);
  //                   }}
  //                 />
  //               </View>
  //             </View>
  //           </Card>
  //           {item.id === "3" && item.isChecked && (
  //             <TextInput
  //               style={styles.languageInput}
  //               value={searchLang}
  //               placeholder="Type Language"
  //               onChangeText={(text) => {
  //                 setSearchLang(text);
  //               }}
  //             />
  //           )}
  //         </View>
  //       )}
  //     />
  //   );
  // };

  function updateSearch(search) {
    setSearch(search);
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never"]);    
    LogBox.ignoreLogs(["Bottom Tab Navigator: 'tabBarOptions’ is deprecated"]);

    axios.get(`${API}/api/showallusers`, {
      headers: {
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    })
    .then((response) => {
      // console.warn('CURRENT USER', currentUser);
      let usersDict = {}
      response.data.map(user => {
        let stringId = user.id;
        stringId = stringId.toString();
        usersDict[stringId] = user;
      })
      // console.warn('USERS', usersDict);
      setUsers(usersDict);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/myimages/download.jpg")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
        resizeMode="cover"
      >
        <HeaderWithoutLogo title="Browse" />
        <Text
          style={{
            marginLeft: 10,
            marginTop: 15,
            marginBottom: -15,
            fontWeight: "bold",
          }}
        >
          Search for your favorite books:
        </Text>

        <View
          style={{
            // backgroundColor: "#710D0D",
            marginTop: 10,
            borderRadius: 5,
            width: "99%",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <SearchBar value={search} updateSearch={updateSearch} style={{}} />
        </View>
        {/* <View style={{ padding: 8 }}>{renderFlatList(filters)}</View> */}
        <Text style={{ marginLeft: 10, marginTop: 15 }}>
          Filter by Language:
        </Text>

        <TextInput
          style={styles.languageInput}
          value={searchLang}
          placeholder="Type Language"
          onChangeText={(text) => {
            setSearchLang(text);
          }}
        />

        <Text style={{ marginLeft: 10, marginTop: 10 }}>Filter by Status:</Text>
        <View style={styles.dropDown}>
          <DropDownPicker
            style={{
              backgroundColor: "white",
              marginTop: -15,
              marginLeft: 2,
              marginRight: 2,
              // width: '101.5%',
              borderWidth: 1,
              width: "102%",
              justifyContent: "center",
              // padding: 17,
              alignSelf: "center",
              height: 35,
            }}
            open={open}
            value={status}
            items={statusOptions}
            setOpen={setOpen}
            setValue={setStatus}
            showTickIcon={false}
            setItems={setStatus}
            dropDownDirection="AUTO"
            placeholder="Select Status"
            placeholderStyle={{
              color: dropDownDisabled ? "grey" : "black",
            }}
          />
        </View>
        <View style={{ padding: 9 }}>
          <View style={{ marginBottom: 5 }}>
            <AddButton
              title="Search"
              onPress={() =>
                navigation.navigate("Search Results", {
                  data: { filters, status, search, searchLang, users },
                })
              }
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    textAlign: "left",
    alignSelf: "center",

    fontWeight: "bold",
  },
  dropDown: {
    marginTop: 7,
    padding: 8,
    // width: '97%'
  },
  languageInput: {
    // height: 40,
    // margin: 8,
    // borderWidth: 1,
    // padding: 10,
    // borderRadius: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    width: "97%",
    justifyContent: "center",
    padding: 8,
    alignSelf: "center",
    height: 35,
    marginBottom: 10,
  },
});
