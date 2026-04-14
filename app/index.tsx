import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { ConfettiDots } from "@/components/ConfettiDots";
import { IMAGES } from "@/constants/images";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-between px-6 py-6">
        <ConfettiDots />

        <View className="z-10 items-center mt-8 w-full">
          <Text className="text-5xl mb-4">⚡</Text>
          <Text className="text-4xl font-extrabold text-foreground tracking-tight text-center leading-snug">
            Track your{"\n"}home cooking
          </Text>
        </View>

        <View className="z-10 flex-1 items-center justify-center w-full my-8">
          <Image
            source={{ uri: IMAGES.mascot }}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        <View className="z-10 w-full flex-row items-center justify-between pb-4">
          <Pressable className="flex-row items-center gap-1.5 px-3 py-2 rounded-full active:bg-muted">
            <Text className="text-lg">🇺🇸</Text>
            <Text className="text-xs font-bold text-muted-foreground tracking-widest">EN</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(onboarding)/reminders")}
            className="bg-primary active:bg-primary/90 px-8 py-4 rounded-[2rem] shadow-md w-[200px] items-center active:scale-95"
          >
            <Text className="text-primary-foreground font-bold tracking-wide text-sm">
              GET STARTED
            </Text>
          </Pressable>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
