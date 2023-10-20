import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeScreen } from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { PrayerAppProvider, usePrayerAppContext } from "./Store/context";

const Tab = createBottomTabNavigator();

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
            <Ionicons
              name="bookmarks-outline"
              color={`#fffd54`}
              size={size}
            />
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
    <>
      <PrayerAppProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PrayerAppProvider>
    </>
  );
}
