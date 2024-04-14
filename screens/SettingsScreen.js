import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import RightArrow from "react-native-vector-icons/AntDesign";
import AccountIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PrivacyIcon from "react-native-vector-icons/MaterialIcons";
import SecurityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import NotificationsIcon from "react-native-vector-icons/Ionicons";
import HelpIcon from "react-native-vector-icons/Entypo";
import InformationIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const data = JSON.parse(user);
      setRole(data.role);
    };
    getUser();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={[
          tw`h-20 flex items-center justify-center`,
          { backgroundColor: "#061551" },
        ]}
      >
        <Text style={[tw`text-white text-2xl font-bold`]}>Settings</Text>
      </View>
      <ScrollView>
        <View>
          <Text style={[tw`text-xl font-bold p-4`, { color: "#061551" }]}>
            General
          </Text>
        </View> 
        <View>
          <View
            style={[
              tw`border-b m-4 py-2 flex flex-row justify-between`,
              { borderColor: "gray" },
            ]}
          >
            <View style={tw`flex flex-row`}>
              <View
                style={tw`h-8 w-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center`}
              >
                <AccountIcon name="account" size={20} style={tw``} />
              </View>
              <Text style={[tw`font-semibold pt-2`]}>Account</Text>
            </View>
            <View>
              <RightArrow name="right" size={20} style={tw``} />
            </View>
          </View>
          <View
            style={[
              tw`border-b m-4 py-2 flex flex-row justify-between`,
              { borderColor: "gray" },
            ]}
          >
            <View style={tw`flex flex-row`}>
              <View
                style={tw`h-8 w-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center`}
              >
                <PrivacyIcon name="privacy-tip" size={20} style={tw``} />
              </View>
              <Text style={[tw`font-semibold pt-2`]}>Privacy</Text>
            </View>
            <View>
              <RightArrow name="right" size={20} style={tw``} />
            </View>
          </View>
          <View
            style={[
              tw`border-b m-4 py-2 flex flex-row justify-between`,
              { borderColor: "gray" },
            ]}
          >
            <View style={tw`flex flex-row`}>
              <View
                style={tw`h-8 w-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center`}
              >
                <SecurityIcon name="security" size={20} style={tw``} />
              </View>
              <Text style={[tw`font-semibold pt-2`]}>Security</Text>
            </View>
            <View>
              <RightArrow name="right" size={20} style={tw``} />
            </View>
          </View>
          <View
            style={[
              tw`border-b m-4 py-2 flex flex-row justify-between`,
              { borderColor: "gray" },
            ]}
          >
            <View style={tw`flex flex-row`}>
              <View
                style={tw`h-8 w-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center`}
              >
                <NotificationsIcon
                  name="notifications"
                  size={20}
                  style={tw``}
                />
              </View>
              <Text style={[tw`font-semibold pt-2`]}>Notification</Text>
            </View>
            <View>
              <RightArrow name="right" size={20} style={tw``} />
            </View>
          </View>
          <View
            style={[
              tw`border-b m-4 py-2 flex flex-row justify-between`,
              { borderColor: "gray" },
            ]}
          >
            <View style={tw`flex flex-row`}>
              <View
                style={tw`h-8 w-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center`}
              >
                <HelpIcon name="help" size={20} style={tw``} />
              </View>
              <Text style={[tw`font-semibold pt-2`]}>Help</Text>
            </View>
            <View>
              <RightArrow name="right" size={20} style={tw``} />
            </View>
          </View>
          <TouchableOpacity
            style={[
              tw`border-b m-4 py-2 flex flex-row justify-between`,
              { borderColor: "gray" },
            ]}
            onPress={() => navigation.navigate("About")}
          >
            <View style={tw`flex flex-row`}>
              <View
                style={tw`h-8 w-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center`}
              >
                <InformationIcon name="info" size={20} style={tw``} />
              </View>
              <Text style={[tw`font-semibold pt-2`]}>About</Text>
            </View>
            <View>
              <RightArrow name="right" size={20} style={tw``} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Admin Controls  */}
        {role === "Global Admin" || role === "Admin" && (
          <View>
            <View>
              <Text style={[tw`text-xl font-bold p-4`, { color: "#061551" }]}>
                Admin Controls
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={[
                  tw`border-b m-4 py-2 flex flex-row justify-between`,
                  { borderColor: "gray" },
                ]}
                onPress={() => navigation.navigate("PrayerUpload")}
              >
                <View style={tw`flex flex-row`}>
                  <View
                    style={tw`h-8 w-8 rounded-lg bg-gray-200 mr-2 flex items-center justify-center`}
                  >
                    <AccountIcon name="account" size={20} style={tw``} />
                  </View>
                  <Text style={[tw`font-semibold pt-2`]}>Upload Prayers</Text>
                </View>
                <View>
                  <RightArrow name="right" size={20} style={tw``} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
