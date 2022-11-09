import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import client from "../../sanity";

export default function FeaturedRow({ title, subTitle, id }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured" && _id==$id]{
      ...,
      restaurants[]->{
      ...,
        dishes[]->,
    type->{
      name
    }
    }
    }[0]
    `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);

  return (
    <View className="px-4">
      <View className="mt-4 flex-row items-center justify-between">
        <Text className="text-lg font-bold">{title}</Text>
        <ArrowRightIcon color={"#D70F64"} />
      </View>

      <View>
        <Text className="text-xs text-gray-500">{subTitle}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants?.map((item) => (
          <RestaurantCard
            id={item._id}
            imgUrl={item.image}
            title={item.name}
            rating={item.rating}
            genre={item.type?.name}
            address={item.address}
            short_description={item.short_description}
            dishes={item.dishes}
            long={item.long}
            lat={item.lat}
            key={item._id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
