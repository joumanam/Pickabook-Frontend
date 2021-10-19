import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import React from "react";
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
import BookList from "./components/booklist";
import AddBook from "./components/addBook";
import Card from "./components/card";
import Login from "./screens/login";
import Register from "./screens/register";
import Wishlist from "./screens/wishlist";

export default function App() {
  return ( 
    <Wishlist />
    // <Login />
    // <Register /> 
  )
};


