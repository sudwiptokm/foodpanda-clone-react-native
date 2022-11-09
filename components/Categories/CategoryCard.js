import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../../sanity";

export default function CategoryCard({ url, title }) {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{ uri: urlFor(url).url() }}
        className="h-20 w-20 rounded"
      />
      <Text className="text-white absolute bottom-1 left-1 font-bold text-xs bg-gray-900 p-[2px] rounded-lg">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
