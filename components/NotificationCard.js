import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import DustbinIcon from "react-native-vector-icons/Ionicons";

const NotificationCard = ({ title, message }) => {
  return (
    <View
      style={[
        tw`p-5 m-5 rounded-lg shadow-md`,
        { backgroundColor: "rgba(85, 146, 228, 0.3)" },
      ]}
    >
      <Text style={tw`font-semibold text-lg`}>{title}</Text>
      <Text style={tw`text-gray-500`}>{message}</Text>
      <View style={tw`flex flex-row justify-end`}>
        <Text style={tw`text-right pt-2 pr-3`}>{"2 Days ago"}</Text>
        <View style={tw`h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center`}>
            <DustbinIcon
                name="trash-outline"
                size={20}
                color={"#556ee4"}
                style={tw``}
            />
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
