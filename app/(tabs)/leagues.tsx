import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";
import { IMAGES } from "@/constants/images";

export default function LeaguesScreen() {
  const router = useRouter();
  const { user } = useApp();

  const promotionXp = 1000;
  const currentXp = 750;
  const percent = Math.round((currentXp / promotionXp) * 100);

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="w-full flex-row justify-between items-center px-6 pt-3 pb-6">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-muted items-center justify-center"
        >
          <Ionicons name="arrow-back" size={18} color="#2b3040" />
        </Pressable>
        <Text className="text-xl font-bold text-foreground">Leagues</Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 items-center justify-center w-full px-6">
        <View className="relative mb-6 items-center">
          <View className="bg-card rounded-full p-8 shadow-xl border-4 border-accent">
            <Ionicons name="ribbon" size={80} color="#fde08b" />
          </View>
        </View>

        <Text className="text-3xl font-extrabold text-foreground mb-2">{user.league}</Text>
        <Text className="text-muted-foreground font-medium mb-8">Level 2 of 5</Text>

        <Image source={{ uri: IMAGES.mascotApron }} className="w-48 h-48 mb-8" resizeMode="contain" />

        <View className="w-full max-w-xs mb-10">
          <View className="flex-row justify-between items-end mb-2">
            <Text className="text-[11px] font-bold text-muted-foreground tracking-widest">
              PROMOTION PROGRESS
            </Text>
            <Text className="text-[11px] font-bold text-muted-foreground tracking-widest">
              {currentXp} / {promotionXp} XP
            </Text>
          </View>
          <View className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <View className="h-full bg-secondary rounded-full" style={{ width: `${percent}%` }} />
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/leagues/leaderboard")}
          className="w-full max-w-xs bg-primary active:bg-primary/90 py-4 rounded-full shadow-lg mb-6 items-center active:scale-95"
        >
          <Text className="text-primary-foreground font-bold tracking-widest">VIEW LEADERBOARD</Text>
        </Pressable>

        <View className="w-full max-w-xs bg-muted/30 p-4 rounded-2xl flex-row items-center justify-center gap-4">
          <View className="flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full bg-chart-4" style={{ backgroundColor: "#86d1a6" }} />
            <Text className="text-xs font-bold text-muted-foreground">Top 10 advance</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full bg-destructive" />
            <Text className="text-xs font-bold text-muted-foreground">Bottom 5 drop</Text>
          </View>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
