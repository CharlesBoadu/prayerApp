import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { TopNav } from "../components/TopNav";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import { useFocusEffect } from "@react-navigation/native";
import { Modal } from "../components/Modal";
import { TouchableWithoutFeedback } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FavoriteIcon from "react-native-vector-icons/Fontisto";
import { usePrayerAppContext } from "../Store/context";

export const FavoritesScreen = () => {
  const { favoritePrayers, loading, selectedPrayerCategory } = usePrayerAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [showModal, setShowModal] = useState(false);
  let modalOption = {
    option_name: "Remove From Favorites",
  };

  // const handleAddToFavorites = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://127.0.0.1:5000/api/v1/favorite_prayers/new",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           prayer_id: prayer?.id,
  //           prayer: prayer.prayer,
  //           scripture: prayer.scripture,
  //           category: prayer.category,
  //           user_id: prayer.user_id,
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     if (data.statusCode === "PA00") {
  //       setShowToast(true);
  //       setMessage("Prayer Added to Favorites");
  //       setType("success");
  //       setTimeout(() => {
  //         setShowToast(false);
  //         // navigation.navigate("Home");
  //       }, 2000);
  //     } else {
  //       setShowToast(true);
  //       setType("error");
  //       setMessage(data.message);
  //       setTimeout(() => {
  //         setShowToast(false);
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error Fetching Favorite Prayers:", error);
  //   }
  // };

  // console.log("Favorite Prayers", favoritePrayers);

  // const closeModal = () => {
  //   setIsModalVisible(false);
  //   setFavoritePrayers((prev) =>
  //     prev.filter((prayer) => prayer.id !== selectedPrayer.id)
  //   );
  //   setFavoritesCount(favoritesCount - 1);
  // };

  // const showToastWithGravityAndOffset = () => {
  //   ToastAndroid.showWithGravityAndOffset(
  //     "Prayer Removed from Favorites",
  //     ToastAndroid.LONG,
  //     ToastAndroid.BOTTOM,
  //     25,
  //     50
  //   );
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setGlobalName("Favorite Prayers");
  //     setShowPrayers(false);
  //   }, [])
  // );

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      {showModal && (
        <View
          style={[
            tw`absolute inset-0 z-50 flex items-center justify-center`,
            { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          ]}
        >
          {/* Render the Modal component with selected prayer details */}
          <Modal
            prayer={selectedFavorite}
            setShowModal={setShowModal}
            modalOptions={modalOption}
            action={""}
          />
        </View>
      )}
      <View
        style={[
          tw`h-20 flex flex-row items-center justify-center`,
          { backgroundColor: "#061551" },
        ]}
      >
        <View style={tw`pr-4`}>
          <FavoriteIcon name="favorite" color={`white`} size={25} />
        </View>
        <Text style={tw`text-white text-2xl font-bold`}>Favorites</Text>
      </View>
      {loading ? (
        <View style={tw`flex items-center justify-center h-60`}>
          <ActivityIndicator size="large" color="#061551" />
        </View>
      ) : (
        <>
          {favoritePrayers.length > 0 ? (
            <FlatList
              data={favoritePrayers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  // activeOpacity={0.3}
                  style={tw`py-4 px-2 border-b border-gray-200`}
                  onPress={() => {
                    setShowModal(true);
                    setSelectedFavorite(item);
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
      {/* {favoritesCount === 0 ? (
        <Text style={tw`flex mt-20 text-black text-xl text-center h-full`}>
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
      <StatusBar style="auto" /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: 300,
  },
});
