import "../global.css";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "@/lib/AppProvider";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#ffffff" } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="meal/new" options={{ presentation: "modal" }} />
            <Stack.Screen name="recipe/[id]" />
            <Stack.Screen name="leagues/leaderboard" />
            <Stack.Screen name="leagues/result" options={{ presentation: "fullScreenModal" }} />
            <Stack.Screen name="paywall/index" options={{ presentation: "modal" }} />
            <Stack.Screen name="paywall/compare" />
            <Stack.Screen name="paywall/welcome" options={{ presentation: "fullScreenModal" }} />
          </Stack>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
