import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import UserIcon from "react-native-vector-icons/FontAwesome";
import EmailIcon from "react-native-vector-icons/Fontisto";
import PhoneIcon from "react-native-vector-icons/Feather";
import ChurchIcon from "react-native-vector-icons/FontAwesome5";

export const ViewUserScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <View>
      <View>
        <View
          style={tw`h-48 w-48 mx-auto rounded-full bg-gray-400 my-10 flex items-center justify-center`}
        >
          <UserIcon name="user" size={100} style={tw`text-white`} />
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
      </View>
    </View>
  );
};
