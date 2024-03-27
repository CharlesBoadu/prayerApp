import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import ShowToastWithGravityAndOffset from "../components/Toast";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";

export const ResetScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  let toastPosition = 10;
  const [values, setValues] = useState({
    email: "",
  });

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/reset_password_email`,
        {
          method: "POST", // Change the method as needed
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (data.statusCode === "PA00") {
        // showToast();
        setShowToast(true);
        setMessage("Email sent successfully");
        setType("success");
        setTimeout(() => {
          setShowToast(false);
          navigation.navigate("NewPassword");
        }, 2000);
      } else {
        setShowToast(true);
        setType("error");
        setMessage(data.message);
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
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
        <ShowToastWithGravityAndOffset
          message={message}
          type={type}
          position={toastPosition}
        />
      )}
      <Image
        source={require("../assets/reset.jpg")}
        alt="Auth Screen Image"
        style={styles.image}
      />
      <Text style={tw`font-bold text-2xl p-8 text-center`}>Reset Password</Text>
      <Text style={tw`w-80 mt-5`}>
        Enter the email associated with your account and we'll send an email
        with instructins to reset your password.
      </Text>
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
      <TouchableOpacity onPress={() => handleSendEmail()}>
        <View
          style={[
            tw`rounded-full bg-blue-500 py-4 px-20 flex items-center mt-10`,
            styles.button,
          ]}
        >
          <Text style={tw`text-lg font-bold text-white`}>
            Send Instructions
          </Text>
        </View>
      </TouchableOpacity>
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
