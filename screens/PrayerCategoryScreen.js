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
import { Modal } from "../components/Modal";

export const PrayerCategoryScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [selectedScripture, setSelectedScripture] = useState("");
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
      {showModal && (
        <View style={[tw`absolute inset-0 z-50 flex items-center justify-center`, { backgroundColor: 'rgba(0, 0, 0, 0.7)'}]}>
          {/* Render the Modal component with selected prayer details */}
          <Modal scripture={selectedScripture} setShowModal={setShowModal}/>
        </View>
      )}

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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  // activeOpacity={0.3}
                  style={tw`py-4 px-2 border-b border-gray-200`}
                  onPress={() => {
                    setShowModal(true)
                    setSelectedScripture(item.scripture)
                  }}
                >
                  <View style={tw`flex flex-row`}>
                    <Text style={tw`pt-1 pr-2 text-red-600`}>{index + 1}</Text>
                    <Text style={tw`text-lg`}>{item.prayer}</Text>
                  </View>
                  <View style={tw`flex flex-row justify-end`}>
                    <Text style={tw`text-green-500`}>({item.scripture})</Text>
                  </View>
                </TouchableOpacity>
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
