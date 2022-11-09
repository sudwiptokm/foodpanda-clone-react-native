import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { XCircleIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-primary flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-4">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XCircleIcon size={30} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-lg text-white">Order Help</Text>
        </View>

        <View className="rounded-md bg-white z-50 mx-5 my-3 p-6 shadow-md">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="font-bold text-4xl">45-55Minutes</Text>
            </View>

            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar indeterminate={true} color="#D70F64" size={30} />
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
        className="z-0 -mt-10 flex-1"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#D70F64"
        />
      </MapView>

      <SafeAreaView className="flex-row space-x-5 items-center h-28 bg-white">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-12 w-12 rounded-full bg-gray-300 ml-4"
        />

        <View className="flex-1">
          <Text className="text-lg">Sudwipto</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>

        <Text className="font-bold text-primary mr-4 text-lg">Call</Text>
      </SafeAreaView>
    </View>
  );
}
