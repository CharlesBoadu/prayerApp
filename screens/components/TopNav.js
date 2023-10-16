import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";

export const TopNav = () => {
  return (
    <SafeAreaView>
      <View style={styles.navContainer}>
        <View style={tw`flex flex-row items-center`}>
            <View style={tw`mr-2`}>
                <Ionicons name="book-outline" size={24} color="#ffd700" />
            </View>
          <Text style={styles.heading}>PRAYER APP</Text>
        </View>
        <View style={tw``}>
            <Text style={styles.heading}>All</Text>
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
    fontSize: 15,
    textAlign: "right",
  }
});
