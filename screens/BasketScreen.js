import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotalAmount,
} from "../slices/basketSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

export default function BasketScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInTheBasket, setGroupedItemsInTheBasket] = useState([]);
  const dispatch = useDispatch();
  const total = useSelector(selectBasketTotalAmount);

  useMemo(() => {
    const groupedItems = items.reduce((result, item) => {
      (result[item.id] = result[item.id] || []).push(item);
      return result;
    }, {});

    setGroupedItemsInTheBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#D70F64] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-gray-400 text-center">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-gray-200 rounded-full absolute top-3 right-5"
            onPress={() => navigation.goBack()}
          >
            <XCircleIcon size={50} color="#D70F64" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Delivery in 50 mins</Text>
          <TouchableOpacity>
            <Text className="text-[#D70F64]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInTheBasket).map(([key, value]) => (
            <View
              key={key}
              className="flex-row items-center py-2 px-4 bg-white space-x-3"
            >
              <Text className="text-[#D70F64]">{value.length} x</Text>
              <Image
                source={{ uri: urlFor(value[0]?.image).url() }}
                className="w-7 h-7 rounded-full"
              />
              <Text className="flex-1">{value[0].name}</Text>
              <Text className="text-gray-600">
                <Currency
                  quantity={value[0].price * value.length}
                  currency="GBP"
                />
              </Text>

              <TouchableOpacity onPress={() => dispatch(removeFromBasket(key))}>
                <Text className="text-xs text-[#D70F64]">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white space-y-5 mt-5">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Total</Text>
            <Text className="text-gray-400">
              <Currency quantity={total} currency="GBP" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={0.99} currency="GBP" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="">Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={0.99 + total} currency="GBP" />
            </Text>
          </View>

          <TouchableOpacity
            className="p-4 rounded-lg bg-[#D70F64]"
            onPress={() => navigation.navigate("PreparingOrder")}
          >
            <Text className="text-center text-white text-xl font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
