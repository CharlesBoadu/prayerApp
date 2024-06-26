import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { PrayerAppProvider, usePrayerAppContext } from "../Store/context";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllPrayersScreen } from "./AllPrayersScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { ProfileScreen } from "./ProfileScreen";
import { SettingsScreen } from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const { favoritesCount, fetchFavoritePrayerByUser, triggerFetch } =
    usePrayerAppContext();

  useEffect(() => {
    fetchFavoritePrayerByUser();
  }, [triggerFetch]);

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#fffd54",
        inactiveTintColor: "#a9a9a9",
        headerShown: false,
        tabBarStyle: { backgroundColor: "white" }, // Style for the tab bar
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
          tabBarLabel: "All",
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
                    {
                      backgroundColor: "#cfd3d3",
                      marginLeft: "-5%",
                      marginTop: "-3%",
                      height: 22,
                      width: 20,
                    },
                    tw`rounded-full opacity-90 flex items-center justify-center`,
                  ]}
                >
                  <Text style={{ color: "#061551", fontWeight: "bold" }}>
                    {favoritesCount}
                  </Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: "Favorites",
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
          tabBarLabel: "Notifications",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              color={`#061551`}
              size={size}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={`#061551`} size={size} />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
};

export const HomeScreen = () => {
  return (
    <PrayerAppProvider>
      <AppNavigator />
    </PrayerAppProvider>
  );
};
