import React from "react";
import { useState, useEffect, useContext } from "react";
import { LogBox } from "react-native";
import HeaderWithoutLogo from "../components/headerWithoutLogo";
import {
  StyleSheet,
  View,
  Image,
  Button,
  ScrollView,
  FlatList,
  ToastAndroid,
  Dimensions,
  Text,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { Rating } from "react-native-ratings";
import { userContext } from "../userContext";
import { db } from "../assets/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy, 
  getDoc,
} from "@firebase/firestore";

export default function AuctionPost(props) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const imgWidth = Dimensions.get("screen").width * 0.45;
  const nav = props.navigation;
  const currentPost = props.route.params.post;

  const { currentUser, setCurrentUser } = useContext(userContext);

  const auctionFolderPath = collection(
    db,
    "Auctions",
    currentPost.id.toString(),
    "Bids"
  );
  const bidsQuery = query(auctionFolderPath, orderBy("bid", "desc"));
  // console.log(currentPost);

  const tableHead = ["Bidder", "Bid Amount", "Bid Made"];
  const [tableData, setTableData] = useState([]);


  const formatTime = (time) => {
    const now = Date.now();
    const difference = Math.floor((now - time) / 1000);
    let message = '';
    if ((difference / 3600) >= 1) {
      message = (Math.floor(difference/3600)).toString() + ' hr' + `${difference/3600 >= 2 ? 's' : ''}` + ' ago'; 
    } else if ((difference / 60) >= 1) {
      message = (Math.floor(difference/60)).toString() + ' min' + `${difference/60 >= 2 ? 's' : ''}` + ' ago'; 
    } else if (difference === 0) {
      message = 'now';
    } else {
      message = Math.floor(difference).toString() + ' sec' + `${difference >= 2 ? 's' : ''}` + ' ago'; 
    }
    return message;
  }

  const getTableContent = (bids) => {
    let tableData = [];
    if (bids) bids.map(bid => {
      const row = [bid.name, bid.bid, formatTime(bid.creation)];
      tableData.push(row);
    })
    console.warn('tabledata', tableData);
    return tableData;
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(bidsQuery, (querySnapshot) => {
      const parsedBids = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setTableData(getTableContent(parsedBids));
    });
    return () => unsubscribe();
  }, []);

  function BookCard(props) {
    const [currentBidder, setCurrentBidder] = useState("");

    const [currentBid, setCurrentBid] = useState(0);
    const [bids, setBids] = useState([]);
    const [bidInput, setBidInput] = useState("");

    const onInputChange = (value) => {
      setBidInput(value);
    };

    function getDate() {
      let date = new Date();
      const dateStr = date.toDateString();
      const timeStr = date.toTimeString().slice(0, 5);
      const strTime = `${dateStr}-${timeStr}`;
      return strTime;
    }

    async function onBid() {
      let strToNumb = parseInt(bidInput, 10);
      if (strToNumb > currentBid) {
        setCurrentBid(strToNumb);
        setBidInput("");
        const data = {
          bid: parseInt(bidInput, 10),
          from: currentUser.user.id.toString(),
          name: currentUser.user.full_name,
          creation: Date.now(),
          date: getDate(),
        };
        const dataForAuction = data;
        const updateBids = await addDoc(auctionFolderPath, dataForAuction);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          "Placed bid is too low",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          -10,
          270
        );
      }
    }

    useEffect(() => {
      const unsubscribe = onSnapshot(bidsQuery, (querySnapshot) => {
        const parsedBids = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (parsedBids.length > 0) {
         setBids(parsedBids);
         setCurrentBid(parsedBids[0].bid);
         setCurrentBidder(parsedBids[0].name);
        }
      });
      return () => unsubscribe();
    }, []);

    return (
      <View>
        <View style={styles.bookcard}>
          <Image
            style={{
              width: imgWidth,
              height: imgWidth,
              alignSelf: "center",
              marginBottom: 5,
              borderWidth: 1,
              borderColor: "black",
            }}
            resizeMode="contain"
            source={{
              uri: currentPost.image_url,
            }}
          />
          <Text style={{ fontWeight: "bold" }}>Book Title: </Text>
          <Text>
            {currentPost.title}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Book Author: </Text>
          <Text>
            {currentPost.author}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Language: </Text>
          <Text>
            {currentPost.language}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Category: </Text>
          <Text>
            {currentPost.category}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Condition: </Text>
          <Text>
            {currentPost.condition}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>Rating: </Text>
          <Text>
            <Rating
              imageSize={20}
              readonly
              startingValue={currentPost.rating}
              style={styles.rating}
            />
            {"\n"}
            {"\n"}
          </Text>
          <Text>
            <Text style={{ fontStyle: "italic", fontWeight: "bold" }}>
              Highest Bidder:{" "}
            </Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {currentBidder}
            </Text>
          </Text>
          <Text>
            <Text style={{ fontStyle: "italic", fontWeight: "bold" }}>
              Currently At:{" "}
            </Text>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              {numberWithCommas(currentBid)} LL{"\n"}
            </Text>
          </Text>
          <View>
            <Text style={{ fontWeight: "bold", alignSelf: 'center' }}>Place Bid:</Text>
            <TextInput
              style={styles.input}
              placeholder="Place Bid"
              keyboardType={"numeric"}
              defaultValue={bidInput}
              handler={onInputChange}
              onChangeText={(newValue) => onInputChange(newValue)}
            />
            <TouchableOpacity onPress={() => onBid()}>
              <Text style={styles.submit}> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreLogs(["Failed prop type"]);
    LogBox.ignoreLogs(["Setting a timer"]);
  }, []);
  
  const currentBid = props.route.params.currentBid;
  const currentBidder = props.route.params.currentBidder;

  return (
    <ScrollView>
      <View style={styles.container}>
        <HeaderWithoutLogo title="For Auction" />
        <View style={styles.content}>
          <View style={styles.list}>
            <BookCard />
          </View>
        </View>
        <View>
          <Text style={styles.biddingTitle}> BIDDING ACTIVITY </Text>
        </View>
        <View>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "center",
              fontStyle: "italic",
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            Auction ends in{" "}
            <Text style={{ color: "red" }}>5 hours 4 minutes</Text>
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Table style={{ width: "95%", alignSelf: "center" }}>
            <Row
              data={tableHead}
              flexArr={[1, 1, 1]}
              style={styles.head}
              textStyle={styles.rowText}
            />
            <TableWrapper style={styles.wrapper}>
              {/* <Col
                data={['a','b','c']}
                style={styles.title}
                heightArr={[28, 28]}
                textStyle={styles.columnText}
              /> */}

              <Rows
                data={tableData}
                flexArr={[1, 1, 1]}
                style={styles.row}
                textStyle={styles.inTableText}
              />
            </TableWrapper>
          </Table> 
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    // flexDirection: 'column'
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  background: {
    width: "100%",
    position: "relative",
  },
  bookcard: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -40,
    marginBottom: -50,
    padding: 16,
    width: "110%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pricetag: {
    textAlign: "center",
    marginTop: -15,
    fontFamily: "SSBold",
    color: "#fff",
    fontSize: 18,
    paddingVertical: 3,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#710D0D",
    borderRadius: 40,
  },
  biddingTitle: {
    marginTop: 30,
    backgroundColor: "#710D0D",
    alignSelf: "center",
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: 20,
    width: "90%",
  },
  head: {
    height: 40,
    backgroundColor: "#710D0D",
    // color: "white",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#710D0D", color: "white" },
  row: { height: 28 },

  inTableText: {
    textAlign: "center",
    color: "green",
    borderBottomWidth: 1,
    fontWeight: "bold",
  },
  rowText: {
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  submit: {
    backgroundColor: "#710D0D",
    color: "white",
    fontWeight: "bold",
    margin: 5,
    padding: 7,
    textAlign: "center",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
});
