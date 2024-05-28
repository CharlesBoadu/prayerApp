import { useState } from "react";
import ShowToastWithGravityAndOffset from "../components/Toast";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";

export const NewPasswordScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  let toastPosition = 70;
  const [values, setValues] = useState({
    email: "",
    temp_password: "",
    new_password: "",
  });

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5005/api/v1/reset_password`,
        {
          method: "PUT", // Change the method as needed
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      console.log(values)
      const data = await response.json();
      if (data.statusCode === "PA00") {
        setShowToast(true);
        setMessage(data.message);
        setType("success");
        setTimeout(() => {
          setShowToast(false);
          navigation.navigate("Login");
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
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`bg-white h-full flex items-center`}>
      {showToast && (
        <ShowToastWithGravityAndOffset
          message={message}
          type={type}
          position={toastPosition}
        />
      )}
      <Text style={tw`font-bold text-4xl p-8 text-center mt-10`}>
        Create New Password
      </Text>
      <Text style={tw`text-lg w-80 text-gray-500 mb-5`}>
        Your new password must be different from previous used passwords
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
      <TextInput
        style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
        placeholder="Enter Temporary Password"
        onChangeText={(newText) =>
          setValues({
            ...values,
            temp_password: newText,
          })
        }
        defaultValue={values.temp_password}
      />
      <TextInput
        style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
        placeholder="Enter New Password"
        onChangeText={(newText) =>
          setValues({
            ...values,
            new_password: newText.toLowerCase(),
          })
        }
        defaultValue={values.new_password}
      />
      <TouchableOpacity onPress={() => handleResetPassword()}>
        <View
          style={[
            tw`rounded-full bg-blue-500 py-4 px-20 flex items-center mt-10`,
            styles.button,
          ]}
        >
          <Text style={tw`text-lg font-bold text-white`}>Reset Password</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 320,
  },
});
