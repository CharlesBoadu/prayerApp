import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeScreen } from "./screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { PrayerAppProvider, usePrayerAppContext } from "./Store/context";
import Toast from "react-native-toast-message";
import tw from "tailwind-react-native-classnames";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
      }}
    >
      {children}
      <View
        style={{
          height: 3,
          width: "100%",
          backgroundColor: "#2290e5",
          marginTop: 3,
        }}
      />
    </View>
  </TouchableWithoutFeedback>
);

export const AppNavigator = () => {
  const { favoritesCount } = usePrayerAppContext();

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#fffd54",
        inactiveTintColor: "#fffd54",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#061551" },
        tabBarLabel: () => null,
        // tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    >
      <Tab.Screen
        name="All"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={`#fffd54`} size={size} />
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
                color={`#fffd54`}
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
              color={`#fffd54`}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <PrayerAppProvider>
      <Toast />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PrayerAppProvider>
  );
}
