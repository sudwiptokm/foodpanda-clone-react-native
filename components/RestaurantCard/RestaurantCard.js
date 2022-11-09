import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MapPinIcon, StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../../sanity";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow-sm"
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="w-64 h-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>

        <View className="flex-row items-center space-x-1">
          <StarIcon color="#FFA500" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500 font-bold">
            <Text className="text-orange-400">{rating}</Text> · {genre}
          </Text>
        </View>

        <View className="flex-row items-center gap-1">
          <MapPinIcon color="gray" size={22} opacity={0.4} />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
