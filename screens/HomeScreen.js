import { SafeAreaView, ScrollView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { TopNav } from "../components/TopNav";
import { PrayerCategories } from "../components/PrayerCategories";
import { PrayerAppProvider, usePrayerAppContext } from "../Store/context";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllPrayersScreen } from "./AllPrayersScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const { favoritesCount } = usePrayerAppContext();

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#061551",
        inactiveTintColor: "#061551",
        headerShown: false,
        tabBarStyle: { backgroundColor: "white" },
        tabBarLabel: () => null,
        // tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    >
      <Tab.Screen
        name="All"
        component={AllPrayersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={`#061551`} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={tw`flex flex-row`}>
              <Ionicons
                name="bookmarks-outline"
                color={`#061551`}
                size={size}
              />
              {favoritesCount === 0 ? null : (
                <View
                  style={[
                    { backgroundColor: "#fffd54", marginLeft: "-5%" },
                    tw`px-3 rounded-full opacity-90`,
                  ]}
                >
                  <Text style={{ color: "#061551", fontWeight: "bold" }}>
                    {favoritesCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="notifications-outline"
              color={`#061551`}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const HomeScreen = () => {
  const { globalName, setGlobalName, showPrayers } = usePrayerAppContext();

  useFocusEffect(
    React.useCallback(() => {
      showPrayers ? setGlobalName(globalName) : setGlobalName("All");
    }, [])
  );

  return (
    <PrayerAppProvider>
      {/* <NavigationContainer> */}
        <AppNavigator />
      {/* </NavigationContainer> */}
    </PrayerAppProvider>
    // <SafeAreaView style={tw`bg-white h-full`}>
    //   <TopNav />
    //   <ScrollView>
    //     <PrayerCategories />
    //   </ScrollView>
    // </SafeAreaView>
  );
};
