import React, { useState } from "react";
import { SafeAreaView, Text, ToastAndroid, View } from "react-native";
import { TopNav } from "../components/TopNav";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import { usePrayerAppContext } from "../Store/context";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const FavoritesScreen = () => {
  const {
    globalName,
    setGlobalName,
    setShowPrayers,
    favoritePrayers,
    setFavoritePrayers,
    setFavoritesCount,
    favoritesCount,
  } = usePrayerAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);

  const closeModal = () => {
    setIsModalVisible(false);
    setFavoritePrayers((prev) =>
      prev.filter((prayer) => prayer.id !== selectedPrayer.id)
    );
    setFavoritesCount(favoritesCount - 1);
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Prayer Removed from Favorites',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      setGlobalName("Favorite Prayers");
      setShowPrayers(false);
    }, [])
  );
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal} // Close the modal when the backdrop is pressed
      >
        <View style={tw`bg-white p-4`}>
          {selectedPrayer && (
            <>
              <Text style={tw`text-lg text-black`}>
                {selectedPrayer.content}
              </Text>
              <Text style={tw`text-lg text-black text-center text-red-600`}>
                {selectedPrayer.scripture}
              </Text>
              {/* Add any additional content you want in the modal */}
            </>
          )}
          <TouchableOpacity
            onPress={() => {
              closeModal()
              showToastWithGravityAndOffset()
            }}
            style={[
              { backgroundColor: "#061551" },
              tw`mt-10 flex flex-row mx-auto rounded-full px-4 py-2`,
            ]}
          >
            <View style={tw`mr-3`}>
              <Ionicons name="trash" color={`#fffd54`} size={30} />
            </View>
            <Text style={[{ color: "#fffd54" }, tw`text-lg`]}>
              Remove From Favorites
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TopNav name={"Favorite Prayers"} />
      {favoritesCount === 0 ? (
        <Text
          style={tw`flex mt-20 text-black text-xl text-center h-full`}
        >
          No Favorite Prayers Selected
        </Text>
      ) : null}
      <ScrollView>
        {favoritePrayers?.map((prayer, index) => (
          <TouchableWithoutFeedback
            onPress={() => {
              setSelectedPrayer(prayer);
              setIsModalVisible(true);
            }}
            key={index}
          >
            <View
              style={[
                {
                  borderBottom: "2px",
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "black",
                },
                tw`p-2`,
              ]}
            >
              <Text style={tw`text-lg text-black`}>{prayer.content}</Text>
              <Text style={tw`text-lg text-black text-center text-red-600`}>
                {prayer.scripture}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
