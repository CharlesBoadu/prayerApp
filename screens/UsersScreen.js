import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import UserIcon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import usersApi from "../Store/usersApi";

export const UsersScreen = () => {
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getOrganizationUsersByID = async () => {
      const user = await AsyncStorage.getItem("user");
      const userData = JSON.parse(user);

      const fetchUsers = async () => {
        try {
          const response = await usersApi.getAllUsersByOrganization({
            organization_id: userData?.organization_id,
          });
          setFetchedUsers(response?.data);
        } catch (error) {
          console.error("Error Fetching All Users By Organization:", error);
        }
      };

      fetchUsers();
    };

    getOrganizationUsersByID();
  }, []);

  return (
    <View>
      <FlatList
        data={fetchedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              tw`border-b m-4 py-2 flex flex-row justify-between`,
              { borderColor: "gray" },
            ]}
            onPress={() => {
              navigation.navigate("ViewUser", { user: item });
            }}
          >
            <View style={tw`flex flex-row`}>
              <View
                style={tw`h-14 w-14 rounded-full bg-gray-200 mr-2 flex items-center justify-center`}
              >
                <UserIcon name="user" size={20} style={tw``} />
              </View>
              <View style={[{ margin: "0 auto" }]}>
                <Text style={[tw`font-semibold pt-2`]}>
                  {item?.first_name + " " + item?.last_name}
                </Text>
                <Text
                  style={[
                    tw`${
                      item.role.toLowerCase() === "global admin"
                        ? "text-green-500"
                        : item?.role === "Admin"
                        ? "text-blue-500"
                        : "text-red-500"
                    }`,
                  ]}
                >
                  {item?.role}
                </Text>
              </View>
            </View>
            <View style={tw`flex flex-row justify-end`}>
              <Text style={tw`text-green-500`}>(Click to View)</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
