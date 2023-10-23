import { ToastAndroid, TouchableWithoutFeedback } from "react-native";
import { View, Text, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { usePrayerAppContext } from "../Store/context";
import Toast from 'react-native-toast-message';

export const SelectedPrayer = ({ prayerSelected, setIsSelected }) => {
  const { favoritesCount, setFavoritesCount, setFavoritePrayers } = usePrayerAppContext();

  const showToast = () => {
    ToastAndroid.show('Prayed added to Favorites', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Prayer Added to Favorites',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Prayer Added to Favorites',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => setIsSelected(false)}>
        <Text style={tw`pl-2 text-lg`}>Back</Text>
      </TouchableWithoutFeedback>
      <View style={tw` mt-10`}>
        <Text style={tw`text-xl text-center`}>{prayerSelected.content}</Text>
        <Text
          style={tw`text-lg text-red-600 font-bold text-center`}
        >{`(${prayerSelected.scripture})`}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          { backgroundColor: "#061551" },
          tw`mt-10 flex flex-row mx-auto rounded-full px-4 py-2`,
        ]}
        onPress={() => {
          setFavoritesCount(favoritesCount + 1);
          setIsSelected(false);
          setFavoritePrayers((prev) => [...prev, prayerSelected]);
          showToastWithGravityAndOffset()
        }}
      >
        <View style={tw`mr-3`}>
          <Ionicons
            name="checkmark-circle-outline"
            color={`#fffd54`}
            size={30}
          />
        </View>
        <Text style={[{ color: "#fffd54" }, tw`text-lg`]}>
          Add to Favorites
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
