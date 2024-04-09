import { SafeAreaView, ScrollView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { usePrayerAppContext } from "../Store/context";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "react-native";
import NotificationCard from "../components/NotificationCard";

export const NotificationsScreen = () => {
  const { globalName, setGlobalName, setShowPrayers, newNotification } =
    usePrayerAppContext();

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
      <View
        style={[
          tw`h-20 flex items-center justify-center`,
          { backgroundColor: "#061551" },
        ]}
      >
        <Text style={tw`text-white text-2xl font-bold`}>Notifications</Text>
      </View>
      {newNotification === false && (
        <View style={tw`flex items-center justify-center h-full`}>
          <Image
            source={require("../assets/no-notifications.jpg")}
            alt="No Notifications Screen Image"
            style={styles.image}
          />
          <Text style={tw`font-bold text-2xl p-8 text-center`}>
            No new notifications!
          </Text>
        </View>
      )}
      <ScrollView><NotificationCard title={"Hello World"} message={"Hello Eeveidsndsj"}/></ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  image: {
    width: "100%",
    height: 300,
  },
};
