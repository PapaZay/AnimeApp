import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-5xl text-primary font-bold mb-12">
        Welcome to AnimeApp!
      </Text>

      <View className="w-full max-w-xs space-y-4">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-in" as any)}
          className="bg-blue-500 py-3 rounded-lg w-full items-center"
        >
          <Text className="text-white text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-up" as any)}
          className="bg-green-500 py-3 rounded-lg w-full items-center"
        >
          <Text className="text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}