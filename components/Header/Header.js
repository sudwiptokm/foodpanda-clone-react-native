import { View, Text } from "react-native";
import React from "react";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <View>
      <TopBar />
      <SearchBar />
    </View>
  );
}
