import { useMemo } from "react";
import { View, Text, Pressable, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";
import type { LeaderboardEntry } from "@/lib/store";

function useCountdown(endIso: number) {
  const diff = Math.max(0, endIso - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days} days, ${hours} hrs left`;
}

function Podium({
  place,
  entry,
  color,
  size,
  crown,
}: {
  place: number;
  entry: LeaderboardEntry;
  color: string;
  size: number;
  crown?: boolean;
}) {
  const bgMap: Record<number, string> = { 1: "#fde08b", 2: "#e5e7eb", 3: "#cd7f32" };
  return (
    <View className="items-center gap-2">
      <View className="relative">
        {crown && (
          <View className="absolute -top-6 left-0 right-0 items-center z-10">
            <Ionicons name="ribbon" size={26} color="#fde08b" />
          </View>
        )}
        <Image
          source={{ uri: entry.avatar }}
          style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 4, borderColor: color }}
        />
        <View
          className="absolute -bottom-2 left-0 right-0 items-center"
        >
          <View
            style={{ backgroundColor: bgMap[place] || "#e5e7eb" }}
            className="w-7 h-7 rounded-full items-center justify-center"
          >
            <Text className="font-bold text-xs text-foreground">{place}</Text>
          </View>
        </View>
      </View>
      <Text className={`font-bold ${place === 1 ? "text-sm" : "text-xs"} text-foreground mt-2`}>
        {entry.name}
      </Text>
      <Text className="text-[10px] font-bold text-muted-foreground">
        {entry.xp.toLocaleString()} XP
      </Text>
    </View>
  );
}

export default function LeaderboardScreen() {
  const router = useRouter();
  const { leaderboard } = useApp();
  const countdown = useCountdown(Date.now() + 3 * 86400000 + 14 * 3600000);

  const top3 = useMemo(() => leaderboard.slice(0, 3), [leaderboard]);
  const rest = useMemo(() => leaderboard.slice(3), [leaderboard]);

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="bg-background/95 px-6 py-4 flex-row items-center justify-between border-b border-border/50">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
          <Ionicons name="arrow-back" size={22} color="#2b3040" />
        </Pressable>
        <View className="items-center">
          <Text className="text-lg font-extrabold text-foreground">Weekly League</Text>
          <View className="flex-row items-center gap-1.5 mt-0.5">
            <Ionicons name="time" size={11} color="#55b4d4" />
            <Text className="text-[10px] font-bold text-muted-foreground tracking-wider">
              {countdown.toUpperCase()}
            </Text>
          </View>
        </View>
        <View className="w-10" />
      </View>

      <FlatList
        data={rest}
        keyExtractor={(item) => String(item.rank)}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <View className="px-6 pt-6 pb-4 flex-row justify-center items-end gap-4 mb-4">
            {top3[1] && <Podium place={2} entry={top3[1]} color="#f3f4f6" size={64} />}
            {top3[0] && <View className="-mt-4"><Podium place={1} entry={top3[0]} color="#fde08b" size={96} crown /></View>}
            {top3[2] && <Podium place={3} entry={top3[2]} color="#f4d5a8" size={64} />}
          </View>
        }
        renderItem={({ item, index }) => {
          const prevItem = rest[index - 1];
          const showDemotionBreak = item.inDemotionZone && (!prevItem || !prevItem.inDemotionZone);

          let rowBg = "bg-[#f0f9f4] border border-[#dcfce7]";
          if (item.isYou) rowBg = "bg-secondary/5 border-2 border-secondary";
          if (item.inDemotionZone) rowBg = "bg-[#fef2f2] border border-[#fee2e2]";

          return (
            <View className="px-4">
              {showDemotionBreak && (
                <View className="py-4 flex-row items-center justify-center gap-2">
                  <View className="h-px bg-border/50 flex-1" />
                  <Text className="text-[10px] font-bold text-muted-foreground tracking-widest px-2">
                    DEMOTION ZONE
                  </Text>
                  <View className="h-px bg-border/50 flex-1" />
                </View>
              )}
              <View className={`px-4 py-3 rounded-2xl flex-row items-center gap-4 mb-2 ${rowBg}`}>
                <Text className="text-sm font-bold w-4 text-foreground">{item.rank}</Text>
                <Image
                  source={{ uri: item.avatar }}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  style={{ opacity: item.inDemotionZone ? 0.6 : 1 }}
                />
                <View className="flex-1">
                  <Text
                    className={`text-sm ${item.isYou ? "font-extrabold" : "font-bold"} ${item.inDemotionZone ? "text-muted-foreground" : "text-foreground"}`}
                  >
                    {item.name}
                  </Text>
                  {item.streak !== undefined && (
                    <View className="flex-row items-center gap-1 mt-0.5">
                      <Ionicons name="flame" size={11} color="#f97316" />
                      <Text
                        className={`text-[10px] font-bold tracking-tight ${item.isYou ? "text-secondary" : "text-muted-foreground"}`}
                      >
                        {item.streak} DAY STREAK
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  className={`text-xs ${item.isYou ? "font-extrabold text-secondary" : "font-bold text-muted-foreground"}`}
                >
                  {item.xp} XP
                </Text>
              </View>
            </View>
          );
        }}
      />
    </StyledSafeAreaView>
  );
}
