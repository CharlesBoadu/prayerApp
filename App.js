import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthScreen } from "./screens/AuthScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { ResetScreen } from "./screens/ResetScreen";
import { NewPasswordScreen } from "./screens/NewPasswordScreen";
import { NavigationContainer } from "@react-navigation/native";
import { PrayerAppProvider, usePrayerAppContext } from "./Store/context";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AboutScreen from "./screens/AboutScreen";
import PrayerUploadScreen from "./screens/PrayerUploadScreen";
import { PrayerCategoryScreen } from "./screens/PrayerCategoryScreen";
import AddUserScreen from "./screens/AddUserScreen";
import { UsersScreen } from "./screens/UsersScreen";
import { ViewUserScreen } from "./screens/ViewUserScreen";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  //     setIsLoggedIn(isLoggedIn);
  //   };

  //   getUser();
  // }, [isLoggedIn]);
  // console.log("IsLoggedIn", isLoggedIn);

  return (
    <PrayerAppProvider>
      <Toast />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
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
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{
              headerBackTitle: "Settings",
            }}
          />
          <Stack.Screen
            name="PrayerCategory"
            component={PrayerCategoryScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PrayerUpload"
            component={PrayerUploadScreen}
            options={{
              headerBackTitle: "Settings",
              headerTitle: "Upload Prayer",
            }}
          />
          <Stack.Screen
            name="addUser"
            component={AddUserScreen}
            options={{
              headerBackTitle: "Settings",
              headerTitle: "Add New User",
            }}
          />
          <Stack.Screen
            name="viewUsers"
            component={UsersScreen}
            options={{
              headerBackTitle: "Settings",
              headerTitle: "All Users",
            }}
          />
          <Stack.Screen
            name="ViewUser"
            component={ViewUserScreen}
            options={{
              headerBackTitle: "Settings",
              headerTitle: "User Details",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PrayerAppProvider>
  );
}
