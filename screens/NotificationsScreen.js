import { SafeAreaView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import { TopNav } from "../components/TopNav";
import { usePrayerAppContext } from "../Store/context";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export const NotificationsScreen = () => {
  const { globalName, setGlobalName } = usePrayerAppContext();

  useFocusEffect(
    React.useCallback(() => {
      setGlobalName("Notifications");
    }, [])
  );

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TopNav name={"Notifications"} />
      <Text style={tw`text-black text-2xl font-bold`}>
        Notifications Screen
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
