import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";


export const Modal = ({ prayer, setShowModal, modalOptions, action }) => {
  return (
    <View style={tw`bg-white w-60 rounded-lg`}>
      <View style={tw`py-4 px-2 border-b border-gray-200`}>
        <Text style={tw`text-center text-lg font-bold`}>
          {prayer?.scripture}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`py-4 px-2 border-b border-gray-200`}
        onPress={() => {
          modalOptions?.option_name == "Add To Favorites"
            ? action()
            : handleRemoveFromFavorites();
        }}
      >
        <Text style={tw`text-center text-lg`}>{modalOptions?.option_name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`py-4 px-2 border-gray-200`}
        onPress={() => setShowModal(false)}
      >
        <Text style={tw`text-center text-lg`}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
