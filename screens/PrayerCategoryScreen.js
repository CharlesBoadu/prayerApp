import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePrayerAppContext } from "../Store/context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../components/BackButton";
import { FlatList } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import Spinner from "react-native-loading-spinner-overlay";
// import LoadingSpinner from 'react-native-spinkit';

export const PrayerCategoryScreen = () => {
  const navigation = useNavigation();
  const {
    selectedPrayerCategory,
    setSelectedPrayerCategory,
    fetchedPrayers,
    loading,
  } = usePrayerAppContext();

  // console.log("Fetched Prayers", fetchedPrayers);
  // console.log("loading", loading);

  useEffect(() => {
    const getSelectedCategory = async () => {
      const category = await AsyncStorage.getItem("selectedPrayerCategory");
      setSelectedPrayerCategory(category);
    };

    // const categorizePrayers = () => {
    //   const category = fetchedPrayers.map((prayer) => prayer.category);
    //   if (category.toLowerCase() === "health") {
    //     setHealthPrayers(category);
    //   } else if (category.toLowerCase() === "wealth") {
    //     setPraisePrayers(category);
    //   } else if (category.toLowerCase() === "warfare") {
    //     setWarfarePrayers(category);
    //   } else if (category.toLowerCase() === "praise") {
    //     setPraisePrayers(category);
    //   } else if (category.toLowerCase() === "protection") {
    //     setProtectionPrayers(category);
    //   }
    // };

    getSelectedCategory();
    // categorizePrayers();
  }, []);
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <BackButton />
      <View
        style={[
          tw`h-14 flex items-center justify-center`,
          { backgroundColor: "#061551" },
        ]}
      >
        <Text style={tw`text-white text-2xl font-bold`}>
          Prayers About {selectedPrayerCategory}{" "}
        </Text>
      </View>
      {loading ? (
        <View style={tw`flex items-center justify-center h-60`}>
          <ActivityIndicator size="large" color="#061551" />
        </View>
      ) : (
        <>
          {fetchedPrayers.some(
            (item) =>
              item.category.toLowerCase() ===
              selectedPrayerCategory.toLowerCase()
          ) ? (
            <FlatList
              data={fetchedPrayers.filter(
                (prayer) =>
                  prayer?.category.toLowerCase() ===
                  selectedPrayerCategory.toLowerCase()
              )}
              keyExtractor={(item) => item.user_id.toString()}
              renderItem={({ item }) => (
                (
                  <TouchableOpacity
                    // style={styles.item}
                    onPress={() =>
                      navigation.navigate("PrayerList", { category: item })
                    }
                  >
                    <Text>{item.prayer}</Text>
                  </TouchableOpacity>
                )
              )}
            />
          ) : (
            <View style={tw`flex items-center justify-center`}>
              <Image
                source={require("../assets/no-data.jpg")}
                alt="No Prayers Image"
                style={styles.image}
              />
              <Text style={tw`text-xl font-bold`}>
                No Prayers About {selectedPrayerCategory} Yet
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: 300,
  },
});
