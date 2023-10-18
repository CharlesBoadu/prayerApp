import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";
import { usePrayerAppContext } from "../Store/context";

export const TopNav = () => {
  const { globalName } = usePrayerAppContext();

  return (
    <SafeAreaView>
      <View style={styles.navContainer}>
        <View style={tw`flex flex-row items-center`}>
          <View style={tw`mr-2`}>
            <Ionicons name="book-outline" size={24} color="#ffd700" />
          </View>
          <Text style={styles.heading}>PRAYER APP</Text>
        </View>
        <View style={tw`flex flex-row justify-end`}>
          <View style={tw`mr-1`}>
            <Text style={styles.heading}>{globalName}</Text>
          </View>
          <View>
            <Ionicons name="ellipse" color={"#12cc02"} size={8}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#061551",
    padding: 5,
    display: "flex",
    justifyContent: "justify-between",
  },
  heading: {
    color: "#ffd700",
    fontSize: 17,
    textAlign: "right",
  },
});
