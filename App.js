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
import { ResetScreen } from "./screens/ResetScreen";
import { NewPasswordScreen } from "./screens/NewPasswordScreen";
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
          <Stack.Screen name="Reset" component={ResetScreen} />
          <Stack.Screen
            name="NewPassword"
            component={NewPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PrayerAppProvider>
  );
}
