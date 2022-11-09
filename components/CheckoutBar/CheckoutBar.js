import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotalAmount,
} from "../../slices/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

export default function CheckoutBar() {
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotalAmount);

  const navigation = useNavigation();

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        className={`flex-row mx-5 p-4 rounded-lg items-center space-x-1 bg-[#D70F64]`}
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="font-extrabold text-white text-lg bg-[#D78E9D] px-2 py-1">
          {items.length}
        </Text>
        <Text className="font-extrabold text-white text-lg text-center flex-1">
          View basket
        </Text>
        <Text className="font-extrabold text-white text-lg">
          <Currency quantity={total} currency="GBP" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
