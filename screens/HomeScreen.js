import { SafeAreaView, ScrollView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { TopNav } from "../components/TopNav";
import { PrayerCategories } from "../components/PrayerCategories";
import { usePrayerAppContext } from "../Store/context";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export const HomeScreen = () => {
  const { globalName, setGlobalName, showPrayers } = usePrayerAppContext();

  useFocusEffect(
    React.useCallback(() => {
      showPrayers ? setGlobalName(globalName) : setGlobalName("All");
    }, [])
  );

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TopNav />
      <ScrollView>
        <PrayerCategories />
      </ScrollView>
    </SafeAreaView>
  );
};
