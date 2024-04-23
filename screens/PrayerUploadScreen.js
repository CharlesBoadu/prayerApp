import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Picker } from "@react-native-picker/picker";
import UploadIcon from "react-native-vector-icons/Feather";
import ShowToastWithGravityAndOffset from "../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePrayerAppContext } from "../Store/context";

const PrayerUploadScreen = () => {
  let toastPosition = 10;
  const [selectedValue, setSelectedValue] = useState("");
  const { triggerFetch, setTriggerFetch } = usePrayerAppContext();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    user_id: "",
    category: "",
    scripture: "",
    prayer: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const data = JSON.parse(user);
      setValues({
        ...values,
        user_id: data.id,
      });
    };
    getUser();
  }, []);

  const handlePrayerUpload = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:5000/api/v1/prayer/new`, {
        method: "POST", // Change the method as needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.statusCode === "PA00") {
        setShowToast(true);
        setMessage(data.message);
        setType("success");
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
        setTriggerFetch(!triggerFetch);
        setValues({
          ...values,
          category: "",
          scripture: "",
          prayer: "",
        });
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
    <View style={tw`bg-white h-full`}>
      {showToast && (
        <ShowToastWithGravityAndOffset
          message={message}
          type={type}
          position={toastPosition}
        />
      )}
      <Picker
        selectedValue={values.category ? values.category : "Select Prayer Category"}
        onValueChange={(itemValue, itemIndex) =>
          setValues({ ...values, category: itemValue })
        }
      >
        <Picker.Item label="Select Prayer Category" value="" />
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Wealth" value="Wealth" />
        <Picker.Item label="Warfare" value="Warfare" />
        <Picker.Item label="Praise" value="Praise" />
        <Picker.Item label="Protection" value="Protection" />
      </Picker>
      <View>
        <Text style={tw`text-lg font-bold p-4`}>Scripture</Text>
        <TextInput
          style={tw`border border-blue-800 rounded-lg py-4 mx-5 px-2`}
          placeholder="Enter Scripture"
          onChangeText={(newText) =>
            setValues({
              ...values,
              scripture: newText,
            })
          }
          defaultValue={values.scripture}
        />
      </View>
      <View>
        <Text style={tw`text-lg font-bold p-4`}>Prayer Request</Text>
        <TextInput
          multiline={true}
          style={tw`border border-blue-800 h-40 rounded-lg py-4 mx-5 px-2`}
          onChangeText={(newText) =>
            setValues({
              ...values,
              prayer: newText,
            })
          }
          defaultValue={values.prayer}
          placeholder="Enter Prayer Request"
        />
      </View>
      <TouchableOpacity
        style={tw`flex flex-row justify-end`}
        onPress={() => handlePrayerUpload()}
      >
        <View
          style={tw`rounded-lg bg-blue-800 py-2 px-4 flex flex-row items-center mt-10 mr-5`}
        >
          <UploadIcon name="upload" size={20} style={tw`text-white pr-2`} />
          <Text style={tw`font-semibold text-white`}>Upload</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PrayerUploadScreen;
