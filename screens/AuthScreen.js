import tw from "tailwind-react-native-classnames";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AuthScreen = () => {
  const navigation = useNavigation();

  const handleNavigationToLogin = () => {
    navigation.navigate("Login");
  };

  const handleNavigationToSignUp = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={tw`bg-white h-full flex items-center justify-center`}>
      <Image
        source={require("../assets/auth.jpg")}
        alt="Auth Screen Image"
        style={styles.image}
      />
      <Text style={tw`font-bold text-4xl p-8 text-center`}>
        Welcome to Prayer App
      </Text>
      <View>
        <TouchableOpacity onPress={() => handleNavigationToLogin()}>
          <View
            style={[
              tw`rounded-full bg-blue-500 py-4 px-20 flex items-center mb-5`,
              styles.button,
            ]}
          >
            <Text style={tw`text-lg font-bold text-white`}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigationToSignUp()}>
        <View
          style={[
            tw`rounded-full py-4 px-20 flex items-center`,
            styles.button,
            styles.signUpButton,
          ]}
        >
          <Text style={tw`text-lg font-bold text-blue-500`}>Sign Up</Text>
        </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={tw`text-center mt-5`}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
    resizeMode: "contain", // Adjust the image content mode as needed
  },
  button: {
    width: 320,
  },
  signUpButton: {
    borderColor: "#2290e5",
    borderWidth: 2,
  },
});
