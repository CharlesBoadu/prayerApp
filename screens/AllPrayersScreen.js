import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";

export const AllPrayersScreen = () => {
  return (
    <SafeAreaView style={[tw`h-full`, styles.container]}>
      <View style={[tw`py-2 ml-4`, styles.header]}>
        <View style={[tw`border-b w-40`, styles.border]}>
          <Text style={tw`text-xl font-bold my-auto text-white`}>
            All Prayers
          </Text>
        </View>
        <View>
          <View style={[tw`w-20 h-20 rounded-lg`, styles.box]}></View>
        </View>
      </View>
      <View style={tw`m-8`}>
        <View style={[tw`mb-8`, styles.prayerCategories]}>
          <View
            style={[
              tw`w-40 h-40 rounded-lg flex items-center justify-center`,
              styles.categoryContainer,
            ]}
          >
            <View>
              <Ionicons name="medkit-outline" color={`white`} size={50} />
            </View>
            <View style={tw`border-b border-white mt-3`}>
              <Text style={[tw`text-lg text-white`]}>Health</Text>
            </View>
          </View>
          <View
            style={[
              tw`w-40 h-40 rounded-lg flex items-center justify-center`,
              styles.categoryContainer,
            ]}
          >
            <View>
              <Ionicons name="medkit-outline" color={`white`} size={50} />
            </View>
            <View style={tw`border-b border-white mt-3`}>
              <Text style={[tw`text-lg text-white`]}>Wealth</Text>
            </View>
          </View>
        </View>
        <View style={[tw`mb-8`, styles.prayerCategories]}>
          <View style={tw`w-40 h-40 rounded-lg bg-white`}></View>
          <View style={tw`w-40 h-40 rounded-lg bg-white`}></View>
        </View>
        <View style={[tw``, styles.prayerCategories]}>
          <View style={tw`w-40 h-40 rounded-lg bg-white`}></View>
          <View style={tw`w-40 h-40 rounded-lg bg-white`}></View>
        </View>
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
