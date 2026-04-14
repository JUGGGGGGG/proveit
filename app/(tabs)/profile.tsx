import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, meals } = useApp();

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-2xl font-extrabold text-foreground">Profile</Text>
          <Pressable className="w-10 h-10 rounded-full bg-muted items-center justify-center">
            <Ionicons name="settings-outline" size={18} color="#2b3040" />
          </Pressable>
        </View>

        <View className="items-center mt-4 mb-8">
          <View className="relative mb-4">
            <Image source={{ uri: user.avatar }} className="w-24 h-24 rounded-full" />
            {user.isPro && (
              <View className="absolute -bottom-1 -right-1 bg-accent px-2 py-1 rounded-full">
                <Text className="text-[9px] font-bold text-accent-foreground tracking-wider">PRO</Text>
              </View>
            )}
          </View>
          <Text className="text-2xl font-extrabold text-foreground">{user.name}</Text>
          <Text className="text-sm text-muted-foreground font-medium mt-1">
            Level {user.level} • {user.league}
          </Text>
        </View>

        <View className="flex-row justify-between gap-3 mb-8">
          <View className="flex-1 bg-muted/30 p-4 rounded-2xl items-center">
            <Ionicons name="flame" size={24} color="#f97316" />
            <Text className="text-xl font-extrabold text-foreground mt-1">{user.streakDays}</Text>
            <Text className="text-[10px] font-bold text-muted-foreground tracking-widest">DAY STREAK</Text>
          </View>
          <View className="flex-1 bg-muted/30 p-4 rounded-2xl items-center">
            <Ionicons name="restaurant" size={24} color="#55b4d4" />
            <Text className="text-xl font-extrabold text-foreground mt-1">{meals.length}</Text>
            <Text className="text-[10px] font-bold text-muted-foreground tracking-widest">MEALS TODAY</Text>
          </View>
          <View className="flex-1 bg-muted/30 p-4 rounded-2xl items-center">
            <Ionicons name="star" size={24} color="#fde08b" />
            <Text className="text-xl font-extrabold text-foreground mt-1">{user.xp}</Text>
            <Text className="text-[10px] font-bold text-muted-foreground tracking-widest">XP</Text>
          </View>
        </View>

        {!user.isPro && (
          <Pressable
            onPress={() => router.push("/paywall")}
            className="bg-primary p-6 rounded-3xl mb-6 flex-row items-center gap-4 active:scale-95"
          >
            <View className="w-12 h-12 bg-accent rounded-2xl items-center justify-center">
              <Ionicons name="star" size={20} color="#2b3040" />
            </View>
            <View className="flex-1">
              <Text className="text-primary-foreground font-extrabold text-base">Upgrade to Pro</Text>
              <Text className="text-primary-foreground/70 text-xs mt-0.5">Unlock community & analytics</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </Pressable>
        )}

        <View className="gap-2">
          {[
            { icon: "trophy-outline", label: "Achievements", href: "/leagues/result" },
            { icon: "card-outline", label: "Compare Plans", href: "/paywall/compare" },
            { icon: "notifications-outline", label: "Reminders" },
            { icon: "help-circle-outline", label: "Help & Support" },
          ].map((item) => (
            <Pressable
              key={item.label}
              onPress={() => item.href && router.push(item.href as any)}
              className="bg-muted/30 p-4 rounded-2xl flex-row items-center gap-4 active:bg-muted/50"
            >
              <Ionicons name={item.icon as any} size={20} color="#55b4d4" />
              <Text className="flex-1 text-sm font-bold text-foreground">{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#8e95a5" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </StyledSafeAreaView>
  );
}
