import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { PrayersScreen } from "../screens/PrayersScreen";
import { usePrayerAppContext } from "../Store/context";

export const PrayerCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Prayers About Health",
      iconName: "heart-outline",
      iconColor: "#fffd54",
      color: "#ff60a8",
    },
    {
      id: 2,
      name: "Prayers About Riches",
      iconName: "cash-outline",
      iconColor: "#fffd54",
      color: "#fc6238",
    },
    {
      id: 3,
      name: "Warfare",
      iconName: "flame-outline",
      iconColor: "white",
      color: "#e60023",
    },
    {
      id: 4,
      name: "Prayers for Protection",
      iconName: "shield-checkmark-outline",
      iconColor: "blue",
      color: "#00cdac",
    },
    {
      id: 5,
      name: "Prayers for Praise",
      iconName: "home-outline",
      iconColor: "white",
      color: "black",
    },
  ];
  const [categoryName, setCategoryName] = useState("");
  const { setGlobalName, showPrayers, setShowPrayers } = usePrayerAppContext();

  const navigation = useNavigation();

  const handlePress = (name) => {
    setShowPrayers(true);
    setCategoryName(name);
    setGlobalName(name);
  };

  return (
    <>
      {showPrayers ? (
        <>
        <PrayersScreen setShowPrayers={setShowPrayers} categoryName={categoryName}/>
        </>
      ) : (
        <>
          {categories.map((category) => (
            <TouchableOpacity
              style={[
                { backgroundColor: `${category.color}` },
                tw`p-5 rounded-xl mb-4 mt-4`,
              ]}
              key={category.id}
              onPress={() => handlePress(category.name)}
            >
              <View style={tw`flex flex-row`}>
                <View style={tw`mr-2`}>
                  <Ionicons
                    name={category.iconName}
                    size={40}
                    color={category.iconColor}
                  />
                </View>
                <Text
                  style={tw`uppercase text-white font-bold text-xl my-auto`}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
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
