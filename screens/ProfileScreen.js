import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import ShowToastWithGravityAndOffset from "../components/Toast";

export const ProfileScreen = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const navigation = useNavigation();
  let toastPosition = 50;

  const handleLogout = () => {
    setShowToast(true);
        setMessage("Logout Successful");
        setType("success")
        setTimeout(() => {
          setShowToast(false);
          navigation.navigate("Auth");
        }, 2000);
  };
  return (
    <SafeAreaView>
      {showToast && <ShowToastWithGravityAndOffset message={message} type={type} position={toastPosition} />}
      <View style={[tw``, styles.header]}>
        <Text style={tw`text-lg text-center text-white py-4`}>
          Your Profile
        </Text>
        <View
          style={[tw`w-40 h-40 rounded-full mx-auto bg-white`, styles.border]}
        ></View>
        <Text style={tw`text-lg text-white text-center py-4`}>
          Charles Osei Boadu
        </Text>
      </View>
      <View
        style={[tw`h-80 mx-auto p-5 flex justify-center`, styles.container]}
      >
        <View style={tw`flex flex-row mb-5`}>
          <TextInput
            style={tw`border-b border-blue-500 w-40 py-4 mr-6`}
            placeholder="First Name"
            onChangeText={(newText) =>
              setValues({
                ...values,
                first_name: newText.toLowerCase(),
              })
            }
            defaultValue={values.first_name}
          />
          <TextInput
            style={tw`border-b border-blue-500 w-40 py-4`}
            placeholder="Last Name"
            onChangeText={(newText) =>
              setValues({
                ...values,
                last_name: newText.toLowerCase(),
              })
            }
            defaultValue={values.last_name}
          />
        </View>
        <View style={tw`flex flex-row mb-5`}>
          <TextInput
            style={tw`border-b border-blue-500 w-40 py-4 mr-6`}
            placeholder="Email"
            onChangeText={(newText) =>
              setValues({
                ...values,
                email: newText.toLowerCase(),
              })
            }
            defaultValue={values.email}
          />
          <TextInput
            style={tw`border-b border-blue-500 w-40 py-4`}
            placeholder="Phone"
            onChangeText={(newText) =>
              setValues({
                ...values,
                phone: newText.toLowerCase(),
              })
            }
            defaultValue={values.phone}
          />
        </View>
        <View style={tw`flex flex-row`}>
          <TextInput
            style={tw`border-b border-blue-500 w-40 py-4 mr-6`}
            placeholder="Age"
            onChangeText={(newText) =>
              setValues({
                ...values,
                age: newText.toLowerCase(),
              })
            }
            defaultValue={values.age}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <View
          style={[
            tw`rounded-full w-80 mx-auto py-2 my-6 flex flex-row justify-center`,
            styles.button,
          ]}
        >
          <Ionicons name="log-out-outline" color={`white`} size={25} />
          <Text style={tw`text-white text-base pl-2`}>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#061551",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    height: "55%",
  },
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "90%",
    borderRadius: 40,
    marginTop: -80,
  },
  button: {
    backgroundColor: "#061551",
  },
});
