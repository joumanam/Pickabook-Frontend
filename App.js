import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import React from "react";
import { LogBox } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "./components/header";
import HeaderWithoutLogo from "./components/headerWithoutLogo";
import BookList from "./components/myWishlistItems";
import AddBook from "./components/addBook";
import Login from "./screens/login";
import Register from "./screens/register";
import MyWishlist from "./screens/myWishlist";
import UserProfile from "./screens/userProfile";
import MyProfile from "./screens/myProfile";
import UserWishlist from "./screens/userWishlist";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="My Profile">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Back To Login Page" }}
        />
        <Stack.Screen
          name="My Profile"
          component={MyProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="My Wishlist"
          component={MyWishlist}
          options={{ title: "Back To My Profile" }}
        />
        <Stack.Screen
          name="User Profile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="User Wishlist"
          component={UserWishlist}
          options={{ title: "Back To Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <Profile />
    //  <Login />
    //  <Register />
    // <MyWishlist />
    //  <UserWishlist />
  );
}
