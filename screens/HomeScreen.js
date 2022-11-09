import { SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import FeaturedRow from "../components/FeaturedRows/FeaturedRow";
import client from "../sanity";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const navigation = useNavigation();

  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
          *[_type == "featured"]{
            ...,
            restaurants[]->{
            ...,
              dishes[]->
          }
        }
        `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);

  return (
    <SafeAreaView className="bg-white py-5 mb-28">
      <Header />
      <ScrollView>
        <Categories />

        {featuredCategories?.map((item, idx) => (
          <FeaturedRow
            title={item.name}
            subTitle={item.short_description}
            id={item._id}
            key={item._id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
