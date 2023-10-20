import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { usePrayerAppContext } from "../Store/context";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SelectedPrayer } from "../components/SelectedPrayer";

export const PrayersScreen = ({ setShowPrayers, categoryName }) => {
  const {
    fetchedHealthPrayers,
    fetchedWealthPrayers,
    fetchedWarfarePrayers,
    fetchedPraisePrayers,
    fetchedProtectionPrayers,
    setGlobalName,
  } = usePrayerAppContext();
  const [data, setData] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [prayerSelected, setPrayerSelected] = useState({});

  useEffect(() => {
    if (categoryName === "Prayers About Health") {
      setData(fetchedHealthPrayers);
    } else if (categoryName === "Warfare") {
      setData(fetchedWarfarePrayers);
    } else if (categoryName === "Prayers for Protection") {
      setData(fetchedProtectionPrayers);
    } else if (categoryName === "Prayers for Praise") {
      setData(fetchedPraisePrayers);
    } else if (categoryName === "Prayers About Riches") {
      setData(fetchedWealthPrayers);
    } else {
      setData([]);
    }
  }, []);

  return isSelected ? (
    <SelectedPrayer prayerSelected={prayerSelected} setIsSelected={setIsSelected} />
  ) : (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowPrayers(false), setGlobalName("All");
        }}
      >
        <Text style={tw`pl-2 text-lg`}>Back</Text>
      </TouchableWithoutFeedback>
      <View>
        <Text style={tw`text-center mb-2 text-xl font-bold uppercase`}>
          {categoryName}
        </Text>
      </View>
      {data?.map((prayer) => (
        <TouchableOpacity
          style={[
            {
              borderBottom: "2px",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: "black",
            },
            tw`flex flex-row p-4`,
          ]}
          key={prayer.id}
          onPress={() => {
            setIsSelected(true);
            setPrayerSelected(prayer);
          }}
        >
          <View style={tw`mr-2`}>
            <Text>{prayer.id}</Text>
          </View>
          <View>
            <Text>{prayer.content}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};
