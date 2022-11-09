import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import {
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow/DishRow";
import CheckoutBar from "../components/CheckoutBar/CheckoutBar";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";

export default function RestaurantScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();
  const {
    params: {
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
    },
  } = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, []);

  return (
    <>
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />

          <TouchableOpacity
            className="absolute top-14 left-5 bg-white p-2 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={20} color="#D70F64" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          {/* Information Section */}
          <View className="px-4">
            <View className="pt-4">
              <Text className="text-3xl font-bold">{title}</Text>

              <View className="flex-row my-1 space-x-2">
                <View className="flex-row space-x-1 items-center">
                  <StarIcon color={"orange"} opacity={0.5} size={22} />
                  <Text className="text-xs text-gray-500 font-bold">
                    <Text className="text-orange-400">{rating}</Text> · {genre}
                  </Text>
                </View>

                <View className="flex-row items-center gap-1">
                  <MapPinIcon color="gray" size={22} opacity={0.4} />
                  <Text className="text-xs text-gray-500">
                    Nearby · {address}
                  </Text>
                </View>
              </View>
            </View>

            <Text className="mt-2 pb-4 text-gray-500">{short_description}</Text>
          </View>

          {/* Food Allergy Section */}
          <View className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
            <Text className="ml-2 text-md flex-1 font-bold">
              Do you have food allergy?
            </Text>
            <ChevronRightIcon color={"#D70F64"} size={20} />
          </View>
        </View>

        {/* Menu */}
        <View>
          <Text className="pt-6 px-4 text-xl font-bold mb-3">Menu</Text>

          {/* Dish Rows */}
          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
        <View className="pb-28"></View>
      </ScrollView>
      <CheckoutBar />
    </>
  );
}
