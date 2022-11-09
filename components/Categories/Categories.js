import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client from "../../sanity";

const dummyData = [
  { url: "https://links.papareact.com/gn7", title: "testing" },
  { url: "https://links.papareact.com/gn7", title: "testing" },
  { url: "https://links.papareact.com/gn7", title: "testing" },
  { url: "https://links.papareact.com/gn7", title: "testing" },
  { url: "https://links.papareact.com/gn7", title: "testing" },
  { url: "https://links.papareact.com/gn7", title: "testing" },
];

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
          *[_type == "category"]{
            image,
            name
          }
        `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <View className="px-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-3"
      >
        {categories?.map((item, idx) => (
          <CategoryCard url={item.image} title={item.name} key={idx} />
        ))}
      </ScrollView>
    </View>
  );
}
