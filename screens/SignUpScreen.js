import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import ShowToastWithGravityAndOffset from "../components/Toast";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


export const SignUpScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  let toastPosition = 10;
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:5005/api/v1/register`, {
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
        setMessage("Sign Up Successful");
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
        source={require("../assets/signup.jpg")}
        alt="Sign Up Image"
        style={styles.image}
      />
      <Text style={tw`font-bold text-2xl p-8 text-center`}>
        Sign Up to Prayer App!
      </Text>
      <ScrollView>
        <TextInput
          style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
          placeholder="Enter First Name"
          onChangeText={(newText) =>
            setValues({
              ...values,
              first_name: newText.toLowerCase(),
            })
          }
          defaultValue={values.first_name}
        />
        <TextInput
          style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
          placeholder="Enter Last Name"
          onChangeText={(newText) =>
            setValues({
              ...values,
              last_name: newText.toLowerCase(),
            })
          }
          defaultValue={values.last_name}
        />
        <TextInput
          style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
          placeholder="Enter Email"
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
          placeholder="Enter Age"
          onChangeText={(newText) =>
            setValues({
              ...values,
              age: newText.toLowerCase(),
            })
          }
          defaultValue={values.age}
        />
        <TextInput
          style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
          placeholder="Enter Phone"
          onChangeText={(newText) =>
            setValues({
              ...values,
              phone: newText.toLowerCase(),
            })
          }
          defaultValue={values.phone}
        />
        <TextInput
          style={tw`border-b border-blue-500 w-80 py-4 mb-5`}
          placeholder="Enter Role"
          onChangeText={(newText) =>
            setValues({
              ...values,
              role: newText.toLowerCase(),
            })
          }
          defaultValue={values.role}
        />
        <TextInput
          style={tw`border-b border-blue-500 w-80 py-4`}
          placeholder="Enter Password"
          onChangeText={(newText) =>
            setValues({
              ...values,
              password: newText.toLowerCase(),
            })
          }
          defaultValue={values.password}
        />
      </ScrollView>
        <TouchableOpacity onPress={() => handleSignUp()}>
          <View
            style={[
              tw`rounded-full bg-blue-500 py-4 px-20 flex items-center mt-10`,
              styles.button,
            ]}
          >
            <Text style={tw`text-lg font-bold text-white`}>Sign Up</Text>
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
