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
import { useState, useEffect } from "react";
import ShowToastWithGravityAndOffset from "../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserIcon from "react-native-vector-icons/SimpleLineIcons";
import SaveIcon from "react-native-vector-icons/Feather";

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

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const data = JSON.parse(user); 
      setValues(data);
    };
    getUser(); 
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("user");
    setShowToast(true);
    setMessage("Logout Successful");
    setType("success");
    setTimeout(() => {
      setShowToast(false);
      navigation.navigate("Auth");
    }, 2000);
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/profile/update/${values.id}`,
        {
          method: "PUT", // Change the method as needed
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(values));
      setShowToast(true);
      setMessage(data.message);
      setType("success");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setShowToast(true);
      setMessage(data.message);
      setType("error");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView>
      {showToast && (
        <ShowToastWithGravityAndOffset
          message={message}
          type={type}
          position={toastPosition}
        />
      )}
      <View style={[tw``, styles.header]}>
        <Text style={tw`text-2xl font-bold text-center text-white py-4`}>
          Your Profile
        </Text>
        <View
          style={[
            tw`w-40 h-40 rounded-full mx-auto bg-white flex items-center justify-center`,
            styles.border,
          ]}
        >
          <UserIcon name="user" color={`#061551`} size={80} />
        </View>
        <Text
          style={[
            tw`text-lg font-semibold text-white text-center py-4`,
            styles.username,
          ]}
        >
          {values?.first_name} {values?.last_name}
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
            defaultValue={values?.first_name}
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
            defaultValue={values?.last_name}
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
            defaultValue={values?.email}
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
            defaultValue={values?.phone}
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
            defaultValue={values?.age.toString()}
          />
        </View>
        <View style={[tw`flex flex-row justify-end`]}>
          <TouchableOpacity onPress={() => handleUpdateProfile()}>
            <View
              style={[
                tw`rounded-lg w-40 mx-auto py-2 my-6 flex flex-row justify-center`,
                { backgroundColor: "#fffd54" },
              ]}
            >
              <SaveIcon name="save" color={`#061551`} size={22} />
              <Text style={[tw`text-base pl-2`, { color: "#061551" }]}>
                Update
              </Text>
            </View>
          </TouchableOpacity>
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
  username: { color: "#fffd54" },
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
