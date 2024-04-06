import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePrayerAppContext } from "../Store/context";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../components/BackButton";
import tw from "tailwind-react-native-classnames";

export const PrayerCategoryScreen = () => {
  const navigation = useNavigation();
  const { selectedPrayerCategory, setSelectedPrayerCategory } = usePrayerAppContext();

  useEffect(() => {
    const getSelectedCategory = async () => {
      const category = await AsyncStorage.getItem("selectedPrayerCategory");
      setSelectedPrayerCategory(category);
    }

    getSelectedCategory();
  }, [])
  return (
    <SafeAreaView>
      <BackButton />
      {/* <FlatList
        data={prayerCategories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("PrayerList", { category: item })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
      /> */}
      <View
        style={[
          tw`h-14 flex items-center justify-center`,
          { backgroundColor: "#061551" },
        ]}
      >
        <Text style={tw`text-white text-2xl font-bold`}>Prayers About {selectedPrayerCategory} </Text>
      </View>
    </SafeAreaView>
  );
};
