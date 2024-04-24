import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Picker } from "@react-native-picker/picker";
import UserIcon from "react-native-vector-icons/FontAwesome";
import EmailIcon from "react-native-vector-icons/Fontisto";
import PhoneIcon from "react-native-vector-icons/Feather";
import ChurchIcon from "react-native-vector-icons/FontAwesome5";
import EditIcon from "react-native-vector-icons/AntDesign";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import { Modal } from "../components/Modal";
import ShowToastWithGravityAndOffset from "../components/Toast";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ViewUserScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone: "",
    role: "",
    organization: "",
    organization_id: "",
  });
  let modalOption = {
    option_name: "Delete User",
  };
  let toastPosition = 10;

  useEffect(() => {
    const getUser = async () => {
      setFormData({
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: String(user.age),
        phone: user.phone,
        role: user.role,
        organization: user.organization,
        organization_id: user.organization_id,
      });
    };
    const getLoggedInUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString); // Parse the string back to an object
        setLoggedInUser(user);
      }
    }


    getUser();
    getLoggedInUser();
  }, []);

  console.log("Logged In User: ", loggedInUser);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/user`, {
        method: "DELETE", // Change the method as needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          organization_id: user.organization_id,
        }),
      });
      const data = await response.json();
      if (data.statusCode === "PA00") {
        setShowToast(true);
        setMessage(data.message);
        setType("success");
        setTimeout(() => {
          setShowToast(false);
          navigation.navigate("Home");
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
    }
  };

  const handleUpdateUser = async () => {
    console.log("Form Data: ", formData);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/user`, {
        method: "PUT", // Change the method as needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.statusCode === "PA00") {
        setShowToast(true);
        setMessage(data.message);
        setType("success");
        setTimeout(() => {
          setShowToast(false);
          navigation.navigate("Home");
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
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  return (
    <View style={tw`h-full`}>
      {showToast && (
        <ShowToastWithGravityAndOffset
          message={message}
          type={type}
          position={toastPosition}
        />
      )}
      {showModal && (
        <View
          style={[
            tw`absolute inset-0 z-50 flex items-center justify-center `,
            { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          ]}
        >
          {/* Render the Modal component with selected prayer details */}
          <Modal
            prayer={user}
            setShowModal={setShowModal}
            modalOptions={modalOption}
            action={handleDeleteUser}
          />
        </View>
      )}
      <View>
        {showUpdate && (
          <ScrollView style={{ display: "flex", height: "50vh", padding: 20 }}>
            <Text style={tw`pl-3 font-semibold`}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.first_name}
              onChangeText={(text) => handleInputChange("first_name", text)}
            />
            <Text style={tw`pl-3 font-semibold`}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.last_name}
              onChangeText={(text) => handleInputChange("last_name", text)}
            />
            <Text style={tw`pl-3 font-semibold`}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <Text style={tw`pl-3 font-semibold`}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="age"
              value={formData.age}
              onChangeText={(text) => handleInputChange("age", text)}
            />
            <Text style={tw`pl-3 font-semibold`}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="phone"
              value={formData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
            />
            <Picker
              selectedValue={formData.role ? formData.role : "Select Role"}
              onValueChange={(itemValue, itemIndex) => {
                handleInputChange("role", itemValue);
              }}
            >
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="Global Admin" value="Global Admin" />
              <Picker.Item label="Admin" value="Admin" />
              <Picker.Item label="User" value="User" />
            </Picker>
            <View style={tw`flex flex-row justify-end`}>
              <TouchableOpacity
                style={tw`rounded-lg bg-red-600 mr-2 py-2 px-4 flex flex-row`}
                onPress={() => setShowUpdate(false)}
              >
                <View style={tw`mr-2 pt-1`}>
                  <EditIcon name="edit" color={"white"} />
                </View>
                <Text style={tw`text-white`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`rounded-lg bg-blue-600 mr-2 py-2 px-4 flex flex-row`}
                onPress={handleUpdateUser}
              >
                <View style={tw`mr-2 pt-1`}>
                  <EditIcon name="edit" color={"white"} />
                </View>
                <Text style={tw`text-white`}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {!showUpdate && (
          <View>
            <View
              style={tw`${
                showUpdate ? "h-24 w-24" : "h-48 w-48"
              } mx-auto rounded-full bg-gray-400 my-10 flex items-center justify-center`}
            >
              <UserIcon
                name="user"
                size={showUpdate ? 50 : 100}
                style={tw`text-white`}
              />
            </View>
            <Text style={tw`text-center text-lg font-semibold`}>
              {user?.first_name} {user?.last_name}
            </Text>
            <View style={tw``}>
              <View style={tw`mx-auto flex flex-row mt-2`}>
                <View style={tw`mr-2 `}>
                  <EmailIcon name="email" size={30} style={tw`text-center`} />
                </View>
                <Text style={tw`text-lg`}>{user?.email}</Text>
              </View>
              <View style={tw`mx-auto flex flex-row mt-2`}>
                <View style={tw`mr-2 `}>
                  <UserIcon name="user" size={30} style={tw`text-center`} />
                </View>
                <Text style={tw`text-lg`}>{user?.age} years</Text>
              </View>
              <View style={tw`mx-auto flex flex-row mt-2`}>
                <View style={tw`mr-2 `}>
                  <PhoneIcon name="phone" size={30} style={tw`text-center`} />
                </View>
                <Text style={tw`text-lg`}>{user?.phone}</Text>
              </View>
              <View style={tw`mx-auto flex flex-row mt-2`}>
                <View style={tw`mr-2 `}>
                  <UserIcon name="user" size={30} style={tw`text-center`} />
                </View>
                <Text style={tw`text-lg`}>{user?.role}</Text>
              </View>
              <View style={tw`mx-auto flex flex-row mt-2`}>
                <View style={tw`mr-2 `}>
                  <ChurchIcon name="church" size={30} style={tw`text-center`} />
                </View>
                <Text style={tw`text-lg`}>{user?.organization}</Text>
              </View>
            </View>
            {loggedInUser?.role?.toLowerCase() === "global admin" && (
              <View style={tw`flex flex-row justify-end mt-5`}>
                <TouchableOpacity
                  style={tw`rounded-lg bg-blue-600 mr-2 py-2 px-4 flex flex-row`}
                  onPress={() => {
                    setShowUpdate(true);
                  }}
                >
                  <View style={tw`mr-2 pt-1`}>
                    <EditIcon name="edit" color={"white"} />
                  </View>
                  <Text style={tw`text-white`}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`rounded-lg bg-red-600 mr-2 py-2 px-4 flex flex-row`}
                  onPress={() => {
                    setShowModal(true);
                  }}
                >
                  <View style={tw`mr-2 pt-1`}>
                    <DeleteIcon name="delete" color={"white"} />
                  </View>
                  <Text style={tw`text-white`}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
