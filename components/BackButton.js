import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export const BackButton = ({ onPress }) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={tw`flex-row items-center py-2 px-2`}>
        <Icon name="chevron-left" size={20} color="#061551" />
        <Text style={tw`text-lg text-blue-900 pl-2`}>Back</Text>
      </View>
    </TouchableOpacity>
  );
};
