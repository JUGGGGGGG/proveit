import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";
import { IMAGES } from "@/constants/images";

const FEATURES: Array<{ label: string; free: boolean; pro: boolean }> = [
  { label: "Meal Logging", free: true, pro: true },
  { label: "Streak tracking", free: true, pro: true },
  { label: "Basic leagues", free: true, pro: true },
  { label: "Recipe community", free: false, pro: true },
  { label: "Advanced stats", free: false, pro: true },
  { label: "Premium badges", free: false, pro: true },
];

function Check({ on }: { on: boolean }) {
  return (
    <Ionicons
      name={on ? "checkmark-circle" : "close-circle"}
      size={22}
      color={on ? "#55b4d4" : "#d1d5db"}
    />
  );
}

export default function CompareScreen() {
  const router = useRouter();
  const { upgradeToPro } = useApp();

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-row justify-between items-center pt-3 mb-10">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-muted items-center justify-center"
          >
            <Ionicons name="arrow-back" size={18} color="#2b3040" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">Compare Plans</Text>
          <View className="w-10" />
        </View>

        <View className="px-4">
          <View className="flex-row items-center mb-4">
            <Text className="text-xs font-bold text-muted-foreground tracking-widest flex-1">
              FEATURE
            </Text>
            <Text className="text-xs font-bold text-muted-foreground tracking-widest w-16 text-center">
              FREE
            </Text>
            <Text className="text-xs font-bold text-secondary tracking-widest w-16 text-center">
              PRO
            </Text>
          </View>
          <View className="h-px bg-border/50 mb-4" />

          {FEATURES.map((f) => (
            <View key={f.label} className="flex-row items-center py-3">
              <Text className="text-sm font-bold text-foreground flex-1">{f.label}</Text>
              <View className="w-16 items-center">
                <Check on={f.free} />
              </View>
              <View className="w-16 items-center">
                <Check on={f.pro} />
              </View>
            </View>
          ))}
        </View>

        <View className="mt-12 items-center">
          <Image source={{ uri: IMAGES.mascot }} className="w-32 h-32" resizeMode="contain" />
          <Text className="text-sm font-bold text-foreground mt-4">
            "You'll love the Pro perks!"
          </Text>
        </View>

        <View className="mt-10 gap-4">
          <View className="p-4 rounded-2xl border-2 border-secondary bg-secondary/5 flex-row items-center justify-between">
            <Text className="font-bold text-sm text-foreground">
              Annual Pro Plan — $29.99/yr
            </Text>
            <Ionicons name="checkmark-circle" size={22} color="#55b4d4" />
          </View>
          <Pressable
            onPress={() => {
              upgradeToPro();
              router.replace("/paywall/welcome");
            }}
            className="w-full bg-primary active:bg-primary/90 py-5 rounded-full shadow-lg items-center active:scale-95"
          >
            <Text className="text-primary-foreground font-bold tracking-widest">
              START FREE TRIAL
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </StyledSafeAreaView>
  );
}
