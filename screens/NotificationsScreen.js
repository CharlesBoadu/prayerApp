import { SafeAreaView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import { TopNav } from "../components/TopNav";
import { usePrayerAppContext } from "../Store/context";
import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
// import { Notifications } from 'react-native-notifications';

export const NotificationsScreen = () => {
  const { globalName, setGlobalName, setShowPrayers } = usePrayerAppContext();

  useFocusEffect(
    React.useCallback(() => {
      setGlobalName("Notifications");
      setShowPrayers(false);

      // scheduleLocalNotification();
    }, [])
  );

  // useEffect(() => {
  //   // Register the notification event listener
  //   Notifications.events().registerNotificationReceived((notification) => {
  //     console.log('Local Notification Received:', notification);
  //   });

  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     Notifications.events().registerNotificationReceived((notification) => {
  //       console.log('Local Notification Received:', notification);
  //     });
  //   };
  // }, []);

  // const scheduleLocalNotification = () => {
  //   Notifications.postLocalNotification({
  //     title: 'My Local Notification',
  //     body: 'This is a local notification!',
  //     extra: 'data',
  //     sound: 'default', // Optional, plays the default notification sound
  //     fireDate: new Date().getTime() + 3000, // 3 seconds from now
  //   });
  // };


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
