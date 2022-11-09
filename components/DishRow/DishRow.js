import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithID,
} from "../../slices/basketSlice";

export default function DishRow({ id, name, description, price, image }) {
  const [showQuantityModifier, setShowQuantityModifier] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithID(state, id));

  const addItemToBasket = () => {
    const dish = {
      id,
      name,
      description,
      price,
      image,
    };

    dispatch(addToBasket(dish));
  };

  const removeItemsFromBasket = () => {
    if (items.length === 0) return;
    dispatch(removeFromBasket(id));
  };

  return (
    <>
      <TouchableOpacity
        className={`bg-white p-4 border border-gray-200 ${
          showQuantityModifier && "border-b-0"
        }`}
        onPress={() => setShowQuantityModifier(!showQuantityModifier)}
      >
        <View className=" flex-row items-center">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4 border border-gray-200"
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Quantity Modifier */}
      {showQuantityModifier && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemsFromBasket}
              disabled={items.length === 0}
            >
              <MinusCircleIcon
                size={40}
                color={items.length !== 0 ? "#D70F64" : "gray"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#D70F64" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
