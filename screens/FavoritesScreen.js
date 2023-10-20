import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { TopNav } from "../components/TopNav";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import { usePrayerAppContext } from "../Store/context";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native";

export const FavoritesScreen = () => {
  const { globalName, setGlobalName, setShowPrayers, favoritePrayers } =
    usePrayerAppContext();

  useFocusEffect(
    React.useCallback(() => {
      setGlobalName("Favorite Prayers");
      setShowPrayers(false);
    }, [])
  );
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TopNav name={"Favorite Prayers"} />
      {/* <Text style={tw`text-black text-2xl font-bold text-center`}>
        Favorites Prayers
      </Text> */}
      <ScrollView
      >
        {favoritePrayers?.map((prayer, index) => (
          <View key={index} 
          style={[
            {
              borderBottom: "2px",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: "black",
            },
            tw`p-2`
          ]}
          >
            <Text style={tw`text-lg text-black`}>{prayer.content}</Text>
            <Text style={tw`text-lg text-black text-center text-red-600`}>{prayer.scripture}</Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
