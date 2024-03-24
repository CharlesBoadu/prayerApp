import React from "react";
import { Platform, ToastAndroid, View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";


const ShowToastWithGravityAndOffset = ({message}) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravityAndOffset(
      "Prayer Removed from Favorites",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  } else {
    // For iOS
    // You can create a custom toast component or use a library like react-native-toast-message
    // For simplicity, I'll show a simple implementation using a View and Text components
    const toastStyles = StyleSheet.create({
      container: {
        position: "absolute",
        backgroundColor: "#333",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        top: 5, // Adjust top position to move the toast to the top
        alignSelf: "center", // Align the toast horizontally to the center
        zIndex: 999,
      },
      text: {
        color: "#fff",
        paddingLeft: 5,
        paddingTop: 2
      },
    });

    return (
      <View style={toastStyles.container}>
        <View style={tw`flex flex-row`}>
        <Ionicons name="checkmark-circle-outline" color={`#fffd54`} size={20} />
        <Text style={toastStyles.text}>{message}</Text>

        </View>
      </View>
    );
  }
};

export default ShowToastWithGravityAndOffset;
