import React from 'react'
import { SafeAreaView, Text, View } from "react-native";
import { TopNav } from "../components/TopNav";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import { usePrayerAppContext } from "../Store/context";
import { useFocusEffect } from "@react-navigation/native";


export const FavoritesScreen = () => {
    const { globalName, setGlobalName, setShowPrayers } = usePrayerAppContext();

  useFocusEffect(
    React.useCallback(() => {
      setGlobalName("Favorite Prayers");
      setShowPrayers(false);
    }, [])
  );
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TopNav name={"Favorite Prayers"} />
      <Text style={tw`text-black text-2xl font-bold`}>
        Favorites Screen
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
