// @refresh reset
import React, { useState, useEffect, useRef } from "react";
import { LogBox } from "react-native";
import { userContext } from "./userContext";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Login from "./screens/login";
import Register from "./screens/register";
import MyWishlist from "./screens/myWishlist";
import MyProfile from "./screens/myProfile";
import NotificationsScreen from "./screens/notificationsScreen";
import ChatWindow from "./screens/chatWindow";
import SalePost from "./screens/salePost";
import TradePost from "./screens/tradePost";
import BrowseScreen from "./screens/browseScreen";
import Chats from "./screens/chatScreen";
import EventMap from "./screens/eventMap";
import AddNewBook from "./screens/addNewBook";
import SearchResults from "./screens/searchResults";
import AuctionPost from "./screens/auctionPost";
import EventPost from "./screens/eventPost";
import AddNewEvent from "./screens/addNewEvent";
import ViewOffers from "./screens/viewOffers";
import UserProfile from "./screens/userProfile";
import UserWishlist from "./screens/userWishlist";

export const AuthStack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();
const BrowseStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const EventStack = createStackNavigator();


// Browse nav and every navigation related to it
const BrowseStackScreen = () => (
  <BrowseStack.Navigator>
    <BrowseStack.Screen
      name="Browse"
      component={BrowseScreen}
      options={{ headerShown: false }}
    />
    <BrowseStack.Screen
      name="Search Results"
      component={SearchResults}
      options={{ title: "Go Back to Browse Page" }}
    />
    <BrowseStack.Screen
      name="User Profile"
      component={UserProfile}
      options={{ title: "Go Back To Profile" }}
    />
    <BrowseStack.Screen
      name="Chat Window"
      component={ChatWindow}
      options={{ title: "Go Back To Profile" }}
    />
    <BrowseStack.Screen
      name="MyProfile"
      component={MyProfile}
      options={{ headerShown: false }}
    />
    <BrowseStack.Screen
      name="Sale Post"
      component={SalePost}
      options={{ title: "Go Back To Profile" }}
    />
    <ProfileStack.Screen
      name="Auction Post"
      component={AuctionPost}
      options={{ title: "Go Back To Profile" }}
    />
    <BrowseStack.Screen
      name="Trade Post"
      component={TradePost}
      options={{ title: "Go Back To Profile" }}
    />
  </BrowseStack.Navigator>
);
// Chat nav and every navigation related to it
const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen
      name="Chats"
      component={Chats}
      options={{ headerShown: false }}
    />
    <ChatStack.Screen
      name="Chat Window"
      component={ChatWindow}
      options={{ title: "Go Back to Chats" }}
    />
  </ChatStack.Navigator>
);

// Event nav and every navigation related to it
const EventStackScreen = () => (
  <EventStack.Navigator>
    <EventStack.Screen
      name="Event Map"
      component={EventMap}
      options={{ headerShown: false }}
    />
    <EventStack.Screen
      name="Event Post"
      component={EventPost}
      options={{ title: "Go Back to Map" }}
    />
    <EventStack.Screen
      name="Add Event"
      component={AddNewEvent}
      options={{ title: "Go Back to Map" }}
    />
  </EventStack.Navigator>
);

// Profile nav button and every navigation related to it
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="MyProfile"
      component={MyProfile}
      options={{ headerShown: false }}
    />
    {/* <ProfileStack.Screen
      name="User Profile"
      component={UserProfile}
      options={{ title: "Go Back To Profile" }}
    /> */}
    <ProfileStack.Screen
      name="User Wishlist"
      component={UserWishlist}
      options={{ title: "Go Back To Profile" }}
    />
    <ProfileStack.Screen
      name="Sale Post"
      component={SalePost}
      options={{ title: "Go Back To Profile" }}
    />
    <ProfileStack.Screen
      name="Trade Post"
      component={TradePost}
      options={{ title: "Go Back To Profile" }}
    />
    <ProfileStack.Screen
      name="View Offers"
      component={ViewOffers}
      options={{ title: "Go Back To Post" }}
    />
    <ProfileStack.Screen
      name="Auction Post"
      component={AuctionPost}
      options={{ title: "Go Back To Profile" }}
    />
    <ProfileStack.Screen
      name="My Wishlist"
      component={MyWishlist}
      options={{ title: "Go Back To Profile" }}
    />
    <ProfileStack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ title: "Go Back To Profile" }}
    />
    <ProfileStack.Screen
      name="Chat Window"
      component={ChatWindow}
      options={{ title: "Go Back" }}
    />
  </ProfileStack.Navigator>
);

export default function App() {
 
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["Require cycle"]);
    LogBox.ignoreLogs(["VirtualizedList: missing keys"]);
    LogBox.ignoreLogs(["Each child in a list"]);
    LogBox.ignoreLogs(["Do you have a screen named"]);
  }, []);

  // useEffect(() => {
  //   if(Constants.isDevice && Platform.OS !== 'web') {
  //     registerForPushNotificationsAsync().then(token => {
  //        axios.post(`https://nativenotify.com/api/expo/key`, { appId: 490, appToken: '5DFvRbVJbJ2BxDUTQFm9Mw', expoToken: token })
  //      });
  //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => console.log(response));
  //     return () => { Notifications.removeNotificationSubscription(notificationListener); Notifications.removeNotificationSubscription(responseListener); };
  //   }    });

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavigationContainer>
        {!currentUser ? (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="Register"
              component={Register}
              options={{ title: "Back To Login Page" }}
            />
          </AuthStack.Navigator>
        ) : (
          <Tabs.Navigator
            activeColor="white"
            inactiveColor="grey"
            barStyle={{
              backgroundColor: "#710D0D",
              shadowColor: "black",
              shadowOffset: { width: 1, height: 3 },
              shadowOpacity: 0.7,
              shadowRadius: 5,
              overflow: "hidden",
              height: 56,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            initialRouteName="My Profile"
          >
            <Tabs.Screen
              name="My Profile"
              component={ProfileStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={"account"}
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="Browse Page"
              component={BrowseStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={"book-search"}
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="New Book"
              component={AddNewBook}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={"plus-box"}
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="Chat"
              component={ChatStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={"chat"}
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="Events"
              component={EventStackScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={"map-search"}
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs.Navigator>
        )}
      </NavigationContainer>
    </userContext.Provider>
  );
}
