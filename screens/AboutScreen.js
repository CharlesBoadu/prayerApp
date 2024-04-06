import { View, Text, SafeAreaView, Image, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";

const AboutScreen = () => {
  return (
    <SafeAreaView style={tw`flex items-center justify-center h-full bg-white`}>
      <Image
        source={require("../assets/about.jpg")}
        alt="About Screen Image"
        style={styles.image}
      />
      <Text style={tw`text-center p-4 text-lg`}>
        <Text style={tw`font-bold`}>PrayerApp</Text> is a mobile application designed to empower Christians in
        their prayer lives by providing a platform for communal prayer, personal
        reflection, and spiritual growth. With a user-friendly interface and a
        range of features tailored to individual and community needs,
        PrayerApp aims to foster deeper connections with God and fellow
        believers.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
});

export default AboutScreen;
