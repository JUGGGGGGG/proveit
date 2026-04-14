import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { ConfettiDots, CELEBRATION_DOTS } from "@/components/ConfettiDots";
import { IMAGES } from "@/constants/images";

const PERKS = [
  { icon: "globe" as const, label: "COMMUNITY" },
  { icon: "stats-chart" as const, label: "ANALYTICS" },
  { icon: "ribbon" as const, label: "BADGES" },
  { icon: "shield-checkmark" as const, label: "SUPPORT" },
];

export default function WelcomeToProScreen() {
  const router = useRouter();

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center px-6">
        <ConfettiDots dots={CELEBRATION_DOTS} />

        <View className="z-10 mb-10 items-center">
          <Image
            source={{ uri: IMAGES.mascotPromoted }}
            className="w-64 h-64"
            resizeMode="contain"
          />
        </View>

        <View className="z-10 items-center w-full">
          <Text className="text-4xl font-extrabold text-foreground mb-8 text-center">
            Welcome to{"\n"}PlateUp Pro!
          </Text>

          <View className="flex-row flex-wrap max-w-xs mb-12" style={{ gap: 12 }}>
            {PERKS.map((perk) => (
              <View
                key={perk.label}
                className="bg-muted/50 rounded-2xl items-center justify-center gap-2"
                style={{ width: "47%", padding: 16 }}
              >
                <Ionicons name={perk.icon} size={24} color="#55b4d4" />
                <Text className="text-[10px] font-bold text-foreground tracking-tight">
                  {perk.label}
                </Text>
              </View>
            ))}
          </View>

          <View className="w-full max-w-xs gap-4">
            <Pressable
              onPress={() => router.replace("/(tabs)/community")}
              className="w-full bg-primary active:bg-primary/90 py-5 rounded-full shadow-lg items-center active:scale-95"
            >
              <Text className="text-primary-foreground font-bold tracking-widest">
                EXPLORE RECIPES
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace("/(tabs)")}
              className="items-center py-2"
            >
              <Text className="text-xs font-bold text-muted-foreground tracking-widest">
                GO TO DASHBOARD
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
