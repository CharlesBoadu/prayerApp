import React, { useState } from "react";
const BASE_URL = process.env.BASE_URL;
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import ShowToastWithGravityAndOffset from "../components/Toast";

export const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //   const showToast = () => {
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Login Successful',
  //       text2: 'Welcome to the Prayer App',
  //         visibilityTime: 2000,
  //       });
  //   }

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:5000/api/v1/login`, {
        method: "POST", // Change the method as needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.statusCode === "PA00") {
        // showToast();
        setShowToast(true);
        setMessage("Login Successful");
        setTimeout(() => {
          setShowToast(false);
          navigation.navigate("Home");
        }, 2000);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`bg-white h-full flex items-center justify-center`}>
      {showToast && (
        // <View style={tw``}>
        <ShowToastWithGravityAndOffset message={message} />
        // </View>
      )}
      <Image
        source={require("../assets/auth.jpg")}
        alt="Auth Screen Image"
        style={styles.image}
      />
      <Text style={tw`font-bold text-2xl p-8 text-center`}>
        Login to your account!
      </Text>

      <View>
        <View>
          <TextInput
            style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
            placeholder="Enter your email"
            onChangeText={(newText) =>
              setValues({
                ...values,
                email: newText.toLowerCase(),
              })
            }
            defaultValue={values.email}
          />
          <TextInput
            style={tw`border-b border-blue-500 w-80 py-4`}
            placeholder="Enter password"
            onChangeText={(newText) =>
              setValues({
                ...values,
                password: newText.toLowerCase(),
              })
            }
            defaultValue={values.password}
          />
          <TouchableOpacity onPress={() => handleLogin()}>
            <View
              style={[
                tw`rounded-full bg-blue-500 py-4 px-20 flex items-center mt-10`,
                styles.button,
              ]}
            >
              <Text style={tw`text-lg font-bold text-white`}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  button: {
    width: 320,
  },
});
