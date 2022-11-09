import { View, Text, Image } from "react-native";
import React from "react";
import { ChevronDownIcon, UserIcon } from "react-native-heroicons/outline";

export default function TopBar() {
  return (
    <View className="flex-row pb-3 items-center mx-4 space-x-2">
      <Image
        source={{ uri: "https://links.papareact.com/wru" }}
        className="w-7 h-7 bg-gray-300 p-4 rounded-full"
      />

      <View className="flex-1">
        <Text className="text-xs font-bold text-gray-400">Deliver Now</Text>
        <Text className="text-xl font-bold">
          Current Location
          <View className="px-2">
            <ChevronDownIcon size={20} color="#D70F64" />
          </View>
        </Text>
      </View>

      <UserIcon size={35} color="#D70F64" />
    </View>
  );
}
