import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { PrayerAppProvider, usePrayerAppContext } from "../Store/context";
import { useEffect } from "react";
import AllFetchesApi from "../Store/api";

export const PrayerScreenContextContainer = () => {
  return (
    <PrayerAppProvider>
      <PrayersScreen />
    </PrayerAppProvider>
  );
};

export const PrayersScreen = ({ setShowPrayers }) => {
  const {
    fetchedHealthPrayers,
    fetchedWealthPrayers,
    fetchedWarfarePrayers,
    fetchedPraisePrayers,
    fetchedProtectionPrayers,
  } = usePrayerAppContext();

  console.log("Howdy", fetchedHealthPrayers);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => setShowPrayers(false)}>
        <Text style={tw`pl-2 text-lg`}>Back</Text>
      </TouchableWithoutFeedback>
      <View>
        <Text style={tw`text-center mb-2 text-xl font-bold uppercase`}>
          {"title"}
        </Text>
      </View>
      <View
        style={[
          {
            borderBottom: "2px",
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderColor: "black",
          },
          tw`flex flex-row pl-2 py-4`,
        ]}
      >
        <View style={tw`mr-2`}>
          <Text>{"id"}</Text>
        </View>
        <View>
          <Text>{"content"}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
