import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";
import { IMAGES } from "@/constants/images";

const MEAL_SLOTS = [
  { key: "breakfast", label: "Breakfast", emoji: "🍲" },
  { key: "lunch", label: "Lunch", emoji: "🍝" },
  { key: "dinner", label: "Dinner", emoji: "🍳" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { user, meals, mealGoal } = useApp();

  const loggedCount = meals.length;
  const percent = Math.round((loggedCount / mealGoal) * 100);
  const xpPercent = Math.min(100, Math.round((user.xp / user.xpForNextLevel) * 100));

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-row justify-between items-center mb-4">
          <View className="flex-row items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
            <Ionicons name="flame" size={16} color="#f97316" />
            <Text className="text-sm font-bold text-foreground">{user.streakDays} days</Text>
          </View>
          <View className="flex-row items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
            <Ionicons name="medal" size={16} color="#55b4d4" />
            <Text className="text-sm font-bold text-foreground">Line Cook</Text>
          </View>
        </View>

        <View className="items-center mb-8">
          <Text className="text-5xl font-extrabold text-secondary mb-1">
            {loggedCount} / {mealGoal}
          </Text>
          <Text className="text-muted-foreground text-sm font-bold">
            Cooking • {percent}% of your goal
          </Text>
        </View>

        <View className="items-center justify-center py-6 mb-4">
          <View className="relative w-64 h-80 items-center justify-end">
            <Image
              source={{ uri: IMAGES.mascot }}
              className="w-64 h-80 absolute"
              resizeMode="contain"
              style={{ opacity: 0.15, tintColor: "#000" } as any}
            />
            <Image
              source={{ uri: IMAGES.mascot }}
              className="w-64 h-80"
              resizeMode="contain"
              style={{ opacity: 0.9 }}
            />
          </View>
        </View>

        <View className="w-full max-w-sm mx-auto mb-10">
          <View className="flex-row justify-between items-end mb-1">
            <Text className="text-[10px] font-bold text-muted-foreground tracking-widest">
              LEVEL {user.level}
            </Text>
            <Text className="text-[10px] font-bold text-muted-foreground tracking-widest">
              {user.xp} / {user.xpForNextLevel} XP
            </Text>
          </View>
          <View className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <View className="h-full bg-accent" style={{ width: `${xpPercent}%` }} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
          className="mb-6"
        >
          <Pressable
            onPress={() => router.push("/meal/new")}
            className="items-center min-w-[64px] gap-2"
          >
            <View className="w-16 h-16 rounded-2xl bg-muted/50 items-center justify-center border-2 border-dashed border-muted">
              <Ionicons name="add" size={26} color="#8e95a5" />
            </View>
            <Text className="text-[10px] font-bold text-muted-foreground tracking-tight">
              CUSTOM
            </Text>
          </Pressable>

          {MEAL_SLOTS.map((slot, i) => {
            const isActive = i === 1; // highlight lunch as in design
            return (
              <Pressable
                key={slot.key}
                onPress={() => router.push("/meal/new")}
                className="items-center min-w-[64px] gap-2"
              >
                <View
                  className={`w-16 h-16 rounded-2xl items-center justify-center border-2 shadow-sm ${
                    isActive ? "bg-card border-secondary" : "bg-card border-secondary/20"
                  }`}
                >
                  <Text className="text-3xl">{slot.emoji}</Text>
                </View>
                <Text
                  className={`text-[10px] font-bold tracking-tight ${
                    isActive ? "text-secondary" : "text-muted-foreground"
                  }`}
                >
                  {slot.label.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable
          onPress={() => router.push("/meal/new")}
          className="self-center bg-secondary active:bg-secondary/90 flex-row px-8 py-3 rounded-full shadow-lg items-center gap-2 active:scale-95"
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text className="text-white font-bold tracking-widest">LOG A MEAL</Text>
        </Pressable>
      </ScrollView>
    </StyledSafeAreaView>
  );
}
