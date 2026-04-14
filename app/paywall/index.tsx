import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";
import { IMAGES } from "@/constants/images";

const FEATURES = [
  {
    icon: "globe" as const,
    iconBg: "bg-accent/20",
    iconColor: "#2b3040",
    title: "Recipe Community access",
    desc: "Share and discover thousands of dishes",
  },
  {
    icon: "stats-chart" as const,
    iconBg: "bg-secondary/20",
    iconColor: "#55b4d4",
    title: "Detailed cooking analytics",
    desc: "Track nutrients and spending over time",
  },
  {
    icon: "ribbon" as const,
    iconBg: "bg-accent/20",
    iconColor: "#2b3040",
    title: "Exclusive leagues & badges",
    desc: "Reach Iron Chef status faster",
  },
];

export default function SoftPaywallScreen() {
  const router = useRouter();
  const { selectedPlan, selectPlan, upgradeToPro } = useApp();

  const handleStart = () => {
    upgradeToPro();
    router.replace("/paywall/welcome");
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <StyledSafeAreaView edges={["top"]}>
          <View className="p-6">
            <View className="flex-row justify-end mb-4">
              <Pressable
                onPress={() => router.back()}
                className="p-2 bg-muted/50 rounded-full"
              >
                <Ionicons name="close" size={22} color="#2b3040" />
              </Pressable>
            </View>

            <View className="items-center mb-8">
              <Image
                source={{ uri: IMAGES.mascotWithKey }}
                className="w-48 h-48 mb-4"
                resizeMode="contain"
              />
              <Text className="text-3xl font-extrabold text-foreground mb-2 text-center">
                Unlock PlateUp Pro
              </Text>
              <Text className="text-muted-foreground font-medium text-center">
                Join 100,000+ home chefs and master your kitchen.
              </Text>
            </View>

            <View className="gap-4 mb-8">
              {FEATURES.map((f) => (
                <View key={f.title} className="flex-row items-center gap-4 bg-muted/30 p-4 rounded-2xl">
                  <View className={`w-10 h-10 rounded-xl items-center justify-center ${f.iconBg}`}>
                    <Ionicons name={f.icon} size={20} color={f.iconColor} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-foreground">{f.title}</Text>
                    <Text className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View className="gap-3 mb-8">
              <Pressable
                onPress={() => selectPlan("monthly")}
                className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${
                  selectedPlan === "monthly" ? "border-secondary bg-secondary/5" : "border-border/50"
                }`}
              >
                <View>
                  <Text className="font-bold text-foreground">Monthly</Text>
                  <Text className="text-xs text-muted-foreground mt-0.5">$4.99 / month</Text>
                </View>
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    selectedPlan === "monthly" ? "border-secondary" : "border-border"
                  }`}
                >
                  {selectedPlan === "monthly" && <View className="w-3 h-3 bg-secondary rounded-full" />}
                </View>
              </Pressable>

              <Pressable
                onPress={() => selectPlan("annual")}
                className={`p-4 rounded-2xl border-2 flex-row items-center justify-between relative ${
                  selectedPlan === "annual" ? "border-secondary bg-secondary/5" : "border-border/50"
                }`}
              >
                <View className="absolute -top-3 left-4 bg-secondary px-3 py-1 rounded-full">
                  <Text className="text-white text-[10px] font-bold tracking-widest">BEST VALUE</Text>
                </View>
                <View>
                  <Text className="font-bold text-foreground">Annual</Text>
                  <Text className="text-xs text-muted-foreground mt-0.5">
                    $29.99 / year (Save 50%)
                  </Text>
                </View>
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    selectedPlan === "annual" ? "border-secondary" : "border-border"
                  }`}
                >
                  {selectedPlan === "annual" && <View className="w-3 h-3 bg-secondary rounded-full" />}
                </View>
              </Pressable>
            </View>

            <Pressable
              onPress={handleStart}
              className="w-full bg-primary active:bg-primary/90 py-5 rounded-full shadow-lg mb-4 items-center active:scale-95"
            >
              <Text className="text-primary-foreground font-bold tracking-widest">
                START FREE TRIAL
              </Text>
            </Pressable>

            <Pressable className="items-center mb-4">
              <Text className="text-xs font-bold text-muted-foreground tracking-widest">
                RESTORE PURCHASE
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/paywall/compare")}
              className="items-center"
            >
              <Text className="text-xs font-bold text-secondary tracking-widest">
                COMPARE PLANS
              </Text>
            </Pressable>
          </View>
        </StyledSafeAreaView>

        <View className="bg-muted/30 p-6 items-center gap-4 mt-6">
          <View className="flex-row items-center gap-4">
            <View className="items-center">
              <Text className="text-lg font-bold text-foreground">4.9</Text>
              <View className="flex-row">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Ionicons key={i} name="star" size={12} color="#fde08b" />
                ))}
              </View>
            </View>
            <View className="w-px h-8 bg-border/50" />
            <View className="items-center">
              <Text className="text-lg font-bold text-foreground">100k+</Text>
              <Text className="text-[10px] font-bold text-muted-foreground tracking-wider">
                RATINGS
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
