import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

export const Modal = ({ scripture, setShowModal }) => {
  return (
    <View style={tw`bg-white w-60 rounded-lg`}>
      <View style={tw`py-4 px-2 border-b border-gray-200`}>
        <Text style={tw`text-center text-lg font-bold`}>{scripture}</Text>
      </View>
      <View style={tw`py-4 px-2 border-b border-gray-200`}>
        <Text style={tw`text-center text-lg`}>Add To Favorites</Text>
      </View>
      <TouchableOpacity style={tw`py-4 px-2 border-gray-200`} onPress={() => setShowModal(false)}>
        <Text style={tw`text-center text-lg`}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
