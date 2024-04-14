import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import MoneyIcon from "react-native-vector-icons/Fontisto";
import HealthIcon from "react-native-vector-icons/FontAwesome";
import PrayerIcon from "react-native-vector-icons/FontAwesome5";
import WarfareIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PraiseIcon from "react-native-vector-icons/FontAwesome5";
import ProtectionIcon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { usePrayerAppContext } from "../Store/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AllPrayersScreen = () => {
  const navigation = useNavigation();
  const { setSelectedPrayerCategory } = usePrayerAppContext();

  const handleNavigation = (category) => {
    navigation.navigate("PrayerCategory");
    AsyncStorage.setItem("selectedPrayerCategory", category);
  };

  return (
    <SafeAreaView style={[tw`h-full`, styles.container]}>
      <View style={[tw`py-2 ml-4`, styles.header]}>
        <View style={[tw`border-b w-40`, styles.border]}>
          <Text style={tw`text-xl font-bold my-auto text-white`}>
            All Prayers
          </Text>
        </View> 
        <View>
          <View
            style={[
              tw`w-20 h-20 rounded-lg flex items-center justify-center`,
              styles.box,
            ]}
          >
            <PrayerIcon name="praying-hands" color={`#061551`} size={40} />
          </View>
        </View>
      </View>
      <View style={tw`m-8`}>
        <View style={[tw`mb-8`, styles.prayerCategories]}>
          <TouchableOpacity onPress={handleNavigation.bind(this, "Health")}>
            <View
              style={[
                tw`w-40 h-40 rounded-lg flex items-center justify-center`,
                styles.categoryContainer,
              ]}
            >
              <View>
                <HealthIcon name="heartbeat" color={`white`} size={50} />
              </View>
              <View style={tw`border-b border-white mt-3`}>
                <Text style={[tw`text-lg text-white`]}>Health</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation.bind(this, "Wealth")}>
            <View
              style={[
                tw`w-40 h-40 rounded-lg flex items-center justify-center`,
                styles.categoryContainer,
              ]}
            >
              <View>
                <MoneyIcon name="money-symbol" color={`white`} size={50} />
              </View>
              <View style={tw`border-b border-white mt-3`}>
                <Text style={[tw`text-lg text-white`]}>Wealth</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[tw`mb-8`, styles.prayerCategories]}>
          <TouchableOpacity onPress={handleNavigation.bind(this, "Warfare")}>
            <View
              style={[
                tw`w-40 h-40 rounded-lg flex items-center justify-center`,
                styles.categoryContainer,
              ]}
            >
              <View>
                <WarfareIcon name="sword-cross" color={`white`} size={50} />
              </View>
              <View style={tw`border-b border-white mt-3`}>
                <Text style={[tw`text-lg text-white`]}>Warfare</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigation.bind(this, "Praise")}>
            <View
              style={[
                tw`w-40 h-40 rounded-lg flex items-center justify-center`,
                styles.categoryContainer,
              ]}
            >
              <View>
                <PraiseIcon name="pray" color={`white`} size={50} />
              </View>
              <View style={tw`border-b border-white mt-3`}>
                <Text style={[tw`text-lg text-white`]}>Praise</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleNavigation.bind(this, "Protection")}>
          <View style={[tw``, styles.prayerCategories]}>
            <View
              style={[
                tw`w-40 h-40 rounded-lg flex items-center justify-center`,
                styles.categoryContainer,
              ]}
            >
              <View>
                <ProtectionIcon name="user-shield" color={`white`} size={50} />
              </View>
              <View style={tw`border-b border-white mt-3`}>
                <Text style={[tw`text-lg text-white`]}>Protection</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#061551",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  border: {
    borderColor: "#fffd54",
  },
  box: {
    backgroundColor: "#fffd54",
  },
  prayerCategories: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent white background
    borderRadius: 10, // Add border radius for a softer look
    padding: 20, // Add padding for content
    borderWidth: 1, // Add border for the glass effect
    borderColor: "rgba(255, 255, 255, 0.3)", // Border color matches the background color
    shadowColor: "#000", // Shadow color
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 10, // Shadow radius
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  category: {
    color: "#061551",
  },
});
