import { View, StyleSheet, Text, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";

export const PrayerCategories = () => {
  const categories = [
    { id: 1, name: "Prayers About Health", iconName: "heart-outline", iconColor: "#fffd54", color: "#ff60a8" },
    { id: 2, name: "Prayers About Riches", iconName: "cash-outline", iconColor: "#fffd54", color: "#fc6238" },
    { id: 3, name: "Warfare", iconName: "flame-outline", iconColor: "white", color: "#e60023" },
    {
      id: 4,
      name: "Prayers for Protection",
      iconName: "shield-checkmark-outline",
      iconColor: "blue",
      color: "#00cdac"
    },
    { id: 5, name: "Prayers for Praise", iconName: "home-outline", iconColor: "white", color: "black" },
  ];
  return (
    <>
      {categories.map((category) => (
        <ScrollView style={[{backgroundColor: `${category.color}`}, tw`p-5 rounded-xl mb-4 mt-4`]} key={category.id}>
          <View style={tw`flex flex-row`}>
            <View style={tw`mr-2`}>
              <Ionicons name={category.iconName} size={40} color={category.iconColor} />
            </View>
            <Text style={tw`uppercase text-white font-bold text-xl my-auto`}>{category.name}</Text>
          </View>
        </ScrollView>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#061551",
  },
});
