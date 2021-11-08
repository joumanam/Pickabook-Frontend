import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
  LogBox,
} from "react-native";
import { Icon } from "react-native-elements";
import { db } from '../assets/firebase';
import { userContext } from "../userContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  FieldValue,
  query, where, orderBy, getDoc
} from "@firebase/firestore";

export default function ChatWindow(props) {
    
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const recipient = props.route.params.user;        // to get all recipient data 
  const senderId = currentUser.user.id.toString();
  const recipientId = recipient.id.toString();    // to get recipient id only

  let convFolderName = [senderId, recipientId].sort();
  convFolderName = `${convFolderName[0]}-${convFolderName[1]}`  
  const convFolderPath = collection(db, "Chats", convFolderName, "Messages");
  const senderConvsPath = doc(db, senderId, recipientId);         //we need these 2 for the chat screen (list of chats)
  const recipientConvsPath = doc(db, recipientId, senderId);    

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedList: missing keys"]);
    LogBox.ignoreLogs(["Unhandled promise"]);
    LogBox.ignoreLogs(["Each child in a list"]);
    LogBox.ignoreLogs(["Setting a timer"]);
  }, []);

  function getTime() {
    let date = new Date(); 
    const dateStr = date.toDateString();
    const timeStr = date.toTimeString().slice(0,5);
    const strTime = `${dateStr}-${timeStr}`;
    return strTime;
  }

  const chatsQuery = query(convFolderPath, orderBy('creation', 'desc'));
  
  async function onSend() {
    setInputMessage('');

    const data = {
      message: inputMessage,
      from: senderId,
      creation: new Date(),
      date: getTime()
    }

    const dataForConv = data;
    const dataForSender = {...data, seen: true};
    const dataForRecipient = {...data, seen: false};

    // console.warn('Message Data:', dataForConv);

    const updateMessages = await addDoc(convFolderPath, dataForConv);
    const updateSenderConvs = await setDoc(senderConvsPath, dataForSender);
    const updateRecipientConvs = await setDoc(recipientConvsPath, dataForRecipient);
  }

  async function makeConvSeen() {
    if (messages.length > 0) {
      const data = {...messages[0], seen: true};
      // console.warn('This message was turned to seen:', data);
      const updateSenderConvs = await setDoc(senderConvsPath, data);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedMessages = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      // console.warn('Messages:', parsedMessages);
      setMessages(parsedMessages);

    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // console.warn('chatWindow is in focus?', isFocused);
    makeConvSeen();
  })

 

  useEffect(() => {
    props.navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon
              name="angle-left"
              type="font-awesome"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{ uri: recipient.image_url }}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "black", fontWeight: "700", fontSize: 18 }}>
              {recipient.full_name}
            </Text>

          </View>
        </View>
      ),
    });
    
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <FlatList
          style={{ backgroundColor: "white" }}
          inverted={true}
          data={messages}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get("screen").width * 0.8,
                    backgroundColor: "#710D0D",
                    alignSelf:
                      item.from === senderId
                        ? "flex-end"
                        : "flex-start",
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.from === senderId ? 8 : 0,
                    borderBottomRightRadius:
                      item.from === senderId ? 0 : 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      alignSelf:
                      item.from === senderId
                        ? "flex-end"
                        : "flex-start",
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontStyle: "italic",
                      alignSelf: "flex-end",
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={{ paddingVertical: 10 }}>
          <View style={styles.messageInputView}>
            <TextInput
              defaultValue=''
              style={styles.messageInput}
              value={inputMessage}
              placeholder="Message"
              onChangeText={(text) => setInputMessage(text)}
              // onSubmitEditing={() => onSend()}
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => onSend()}
            >
              <Icon name="send" type="material" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    color: "black",
    alignItems: "center",
  },

  userProfileImage: { height: "100%", aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageInputView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
