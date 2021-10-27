import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";

import Header from "./components/header";
import HeaderWithoutLogo from "./components/headerWithoutLogo";
import AddBook from "./components/addBook";
import Login from "./screens/login";
import Register from "./screens/register";
import MyWishlist from "./screens/myWishlist";
import UserProfile from "./screens/userProfile";
import MyProfile from "./screens/myProfile";
import UserWishlist from "./screens/userWishlist";
import UserTrades from "./screens/tradePost";
import MakeOffer from "./screens/makeOffer";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SalePost from "./screens/salePost";
import { userContext } from "./userContext";
import TradePost from "./screens/tradePost";
import BrowseScreen from "./screens/browseScreen";
import AllBooks from "./screens/AllBooks";
import CheckBooks from "./screens/searchResults";
import Chats from "./screens/chatScreen";
import EventMap from "./screens/eventMap";
import AddNewBook from "./screens/addNewBook";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchResults from "./screens/searchResults";

const Stack = createStackNavigator();
export const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const BrowseStack = createStackNavigator();
const ProfileStack = createStackNavigator();

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
  </BrowseStack.Navigator>
);
// Profile nav button and every navigation related to it
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="MyProfile"
      component={MyProfile}
      options={{ headerShown: false }}
    />
    <ProfileStack.Screen
      name="Sale Post"
      component={SalePost}
      options={{ title: "Go Back" }}
    />
    <ProfileStack.Screen
      name="Trade Post"
      component={TradePost}
      options={{ title: "Go Back" }}
    />
    <ProfileStack.Screen
      name="My Wishlist"
      component={MyWishlist}
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

  // if (isLoading) {
  //   return <LoadingScreen />
  // }

  useEffect(() => {
    LogBox.ignoreLogs(['Require cycle']);
  }, [])


  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavigationContainer>
        {
          !currentUser ? (
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
             tabBarOptions={{
              activeTintColor: '#710D0D',
              inactiveTintColor: 'black',
              showLabel: false,
              allowFontScaling: false,
              keyboardHidesTabBar: true,
              shadowColor: '#FFF',
              labelStyle: {
                fontWeight: "bold",
                fontSize: 10,
              },
            }}
            initialRouteName="My Profile">
             
              <Tabs.Screen 
              name="My Profile" 
              component={ProfileStackScreen} 
              options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={"account"}
                    size={28}
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
                      size={28}
                      color={color}
                    />
                  ),
                }}
              />
               <Tabs.Screen
                name="Add New Book"
                component={AddNewBook}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                      name={"plus-box"}
                      size={40}
                      color={color}
                    />
                  ),
                }}
              />
               <Tabs.Screen
                name="Chat"
                component={Chats}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                      name={"chat"}
                      size={28}
                      color={color}
                    />
                  ),
                }}
              />
               <Tabs.Screen
                name="Events"
                component={EventMap}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused, color, size }) => (
                    <MaterialCommunityIcons
                      name={"map-search"}
                      size={28}
                      color={color}
                    />
                  ),
                }}
              />
            </Tabs.Navigator>
          )

           /* <Stack.Navigator initialRouteName="Browse Screen">
         
          <Stack.Screen name="My Profile" component={MyProfile} options={{ headerShown: false }}/>
          <Stack.Screen name="My Wishlist" component={MyWishlist} options={{ title: "Back To My Profile" }}/>
          <Stack.Screen name="User Profile" component={UserProfile} options={{ headerShown: false }}/>
          <Stack.Screen name="Sale Post" component={SalePost} options={{ title: "Back To Profile" }}/>
          <Stack.Screen name="User Wishlist" component={UserWishlist} options={{ title: "Back To Profile" }}/>
          <Stack.Screen name="Trade Post" component={TradePost} options={{ title: "Back To Profile" }}/>
          <Stack.Screen name="Make Offer" component={MakeOffer} options={{ title: "Back To Trade Post" }}/>
          <Stack.Screen name="Browse Screen" component={BrowseScreen} options={{ headerShown: false }}/>
      
          </Stack.Navigator> */ 
              }
      </NavigationContainer>
        
    </userContext.Provider>
);
    {/* <CheckBooks />
     <BrowseScreen />
     <Profile />
     <Login />
      <Register />
     <MyWishlist />
      <UserWishlist /> */}

  

}
