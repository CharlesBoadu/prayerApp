import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";


export default function App() {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-white`}>
      <Text style={tw`text-red-600`}>
        Hello And Welcome to Prayer App
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView> 
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
