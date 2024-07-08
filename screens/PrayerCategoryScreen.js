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
import ShowToastWithGravityAndOffset from "../components/Toast";
import favoritesApi from "../Store/favoritesApi";

export const PrayerCategoryScreen = () => {
  const navigation = useNavigation();
  const toastPosition = 70;
  const [type, setType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  let modalOption = {
    option_name: "Add To Favorites",
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState("");
  const {
    selectedPrayerCategory,
    setSelectedPrayerCategory,
    fetchedPrayers,
    loading,
    setTriggerFetch,
    triggerFetch,
  } = usePrayerAppContext();

  useEffect(() => {
    const getSelectedCategory = async () => {
      const category = await AsyncStorage.getItem("selectedPrayerCategory");
      setSelectedPrayerCategory(category);
    };

    setTriggerFetch(!triggerFetch);

    getSelectedCategory();
  }, []);

  const handleAddToFavorites = async () => {
    try {
      const response = favoritesApi.addFavoritePrayer({
        prayer_id: selectedPrayer?.id,
        prayer: selectedPrayer.prayer,
        scripture: selectedPrayer.scripture,
        category: selectedPrayer.category,
        user_id: selectedPrayer.user_id,
      });
      // const response = await fetch(
      //   "http://127.0.0.1:5005/api/v1/favorite-prayers/new",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       prayer_id: selectedPrayer?.id,
      //       prayer: selectedPrayer.prayer,
      //       scripture: selectedPrayer.scripture,
      //       category: selectedPrayer.category,
      //       user_id: selectedPrayer.user_id,
      //     }),
      //   }
      // );
      const data = await response.json();
      if (data.statusCode === "PA00") {
        setShowToast(true);
        setMessage("Prayer Added to Favorites");
        setType("success");
        setTriggerFetch(!triggerFetch);
        setShowModal(false);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      } else {
        setShowToast(true);
        setType("error");
        setMessage(data.message);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error Fetching Favorite Prayers:", error);
    }
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      {showToast && (
        <ShowToastWithGravityAndOffset
          message={message}
          type={type}
          position={toastPosition}
        />
      )}
      {showModal && (
        <View
          style={[
            tw`absolute inset-0 z-50 flex items-center justify-center`,
            { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          ]}
        >
          {/* Render the Modal component with selected prayer details */}
          <Modal
            prayer={selectedPrayer}
            setShowModal={setShowModal}
            modalOptions={modalOption}
            action={handleAddToFavorites}
          />
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
                (
                  <TouchableOpacity
                    // activeOpacity={0.3}
                    style={tw`py-4 px-2 border-b border-gray-200 ${
                      item.is_favorite === true ? "bg-yellow-200" : ""
                    }`}
                    onPress={() => {
                      setShowModal(true);
                      setSelectedPrayer(item);
                    }}
                  >
                    <View style={tw`flex flex-row`}>
                      <Text style={tw`pt-1 pr-2 text-red-600`}>
                        {index + 1}
                      </Text>
                      <Text style={tw`text-lg`}>{item.prayer}</Text>
                    </View>
                    <View style={tw`flex flex-row justify-end`}>
                      <Text style={tw`text-green-500`}>({item.scripture})</Text>
                    </View>
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
