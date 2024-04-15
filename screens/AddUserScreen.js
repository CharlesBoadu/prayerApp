import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import tw from "tailwind-react-native-classnames";
import { Picker } from "@react-native-picker/picker";
import ShowToastWithGravityAndOffset from "../components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddUserScreen = () => {
  let toastPosition = 10;
  const [currentStep, setCurrentStep] = useState(1);
  const [progressValue, setProgressValue] = useState(0.5);
  const [type, setType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    phone: "",
    role: "",
    organization: "",
    organization_id: "",
  });

  const totalSteps = 2; // Total number of steps in the form

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  useEffect(() => {
    if (currentStep === 1) {
      setProgressValue(0.5);
    }

    const getUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString); // Parse the string back to an object
        setFormData({
          ...formData,
          organization: user.organization,
          organization_id: user.organization_id,
        });
      }
    };

    getUser();
  }, []);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setProgressValue(progressValue + 0.5);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgressValue(progressValue - 0.5);
    }
  };

  const handleAddNewUser = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/v1/user/register`,
        {
          method: "POST", // Change the method as needed
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.statusCode === "PA00") {
        setShowToast(true);
        setMessage(data.message);
        setType("success");
        setTimeout(() => {
          setShowToast(false);
        }, 2000);
        setFormData({});
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

  return (
    <View style={styles.container}>
      {showToast && (
        <ShowToastWithGravityAndOffset
          message={message}
          type={type}
          position={toastPosition}
        />
      )}
      <View style={styles.progressContainer}>
        <Text
          style={styles.progressText}
        >{`${currentStep} of ${totalSteps}`}</Text>
      </View>
      <View style={tw`flex justify-center items-center`}>
        <ProgressBar
          progress={progressValue}
          width={200}
          height={20}
          color="#00f"
          borderWidth={1}
          borderRadius={10}
        />
      </View>

      {currentStep === 1 && (
        <View style={tw``}>
          {/* <Text style={styles.stepTitle}>Personal Details</Text> */}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(text) => handleInputChange("first_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(text) => handleInputChange("last_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Button title="Next Step" onPress={handleNextStep} />
        </View>
      )}

      {currentStep === 2 && (
        <View>
          {/* <Text style={styles.stepTitle}>Personal Details</Text> */}
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={formData.age}
            onChangeText={(text) => handleInputChange("age", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
          />
          <Picker
            selectedValue={formData.role ? formData.role : "Select Role"}
            onValueChange={(itemValue, itemIndex) =>
              handleInputChange("role", itemValue)
            }
          >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Global Admin" value="Global Admin" />
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="User" value="User" />
          </Picker>
          <Button title="Previous Step" onPress={handlePreviousStep} />
          <Button title="Add New User" onPress={handleAddNewUser} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressContainer: {
    marginBottom: 20,
    width: "100%",
  },
  progressText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    marginTop: 50,
    // marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddUserScreen;
