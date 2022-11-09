import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

export default function SearchBar() {
  const [text, setText] = useState();
  return (
    <View className="flex-row pb-3 items-center mx-4 space-x-2">
      <View className="flex-1 flex-row bg-gray-200 p-3 items-center space-x-2">
        <MagnifyingGlassIcon color="#D70F64" />
        <TextInput
          placeholder="Search Food and Restaurants"
          onChangeText={setText}
        />
      </View>

      <AdjustmentsVerticalIcon color="#D70F64" />
    </View>
  );
}
