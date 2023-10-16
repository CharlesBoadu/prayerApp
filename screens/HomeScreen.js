import { SafeAreaView, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { TopNav } from "./components/TopNav";
import { PrayerCategories } from "./components/PrayerCategories";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <TopNav />
        <PrayerCategories />
    </SafeAreaView>
  );
};
