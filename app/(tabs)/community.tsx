import { useState, useMemo } from "react";
import { View, Text, Pressable, Image, FlatList, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";
import type { Recipe } from "@/lib/store";

const FILTERS = ["Trending", "Following", "Quick Meals", "New"] as const;
type Filter = (typeof FILTERS)[number];

function RecipeCard({ recipe, onPress, onLike }: { recipe: Recipe; onPress: () => void; onLike: () => void }) {
  return (
    <Pressable onPress={onPress} className="mb-8">
      <View className="rounded-[2.5rem] overflow-hidden relative shadow-md mb-3" style={{ aspectRatio: 4 / 3 }}>
        <Image source={{ uri: recipe.image }} className="w-full h-full" resizeMode="cover" />
        <View className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-full flex-row items-center gap-1.5 shadow-sm">
          <Ionicons name="time" size={14} color="#55b4d4" />
          <Text className="text-xs font-bold text-foreground">{recipe.timeMinutes}m</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xl font-extrabold text-foreground flex-1" numberOfLines={1}>
          {recipe.title}
        </Text>
        {recipe.tag && (
          <View className="px-3 py-1 bg-muted rounded-full ml-2">
            <Text className="text-[10px] font-bold tracking-wider text-muted-foreground">
              {recipe.tag.toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: recipe.author.avatar }}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <Text className="text-sm font-bold text-foreground">{recipe.author.name}</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Pressable onPress={onLike} className="flex-row items-center gap-1">
            <Ionicons
              name={recipe.liked ? "heart" : "heart-outline"}
              size={16}
              color={recipe.liked ? "#f26d6d" : "#8e95a5"}
            />
            <Text className="text-xs font-bold text-muted-foreground">
              {recipe.likes >= 1000 ? `${(recipe.likes / 1000).toFixed(1)}k` : recipe.likes}
            </Text>
          </Pressable>
          <View className="flex-row items-center gap-1">
            <Ionicons name="checkmark-circle" size={16} color="#55b4d4" />
            <Text className="text-xs font-bold text-secondary">{recipe.cookedCount} cooked</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function CommunityScreen() {
  const router = useRouter();
  const { recipes, toggleLike, user } = useApp();
  const [activeFilter, setActiveFilter] = useState<Filter>("Trending");

  const filtered = useMemo(() => {
    if (activeFilter === "Quick Meals") return recipes.filter((r) => r.complexity === "Quick");
    if (activeFilter === "New") return [...recipes].reverse();
    return recipes;
  }, [recipes, activeFilter]);

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-border/50">
        <Text className="text-2xl font-extrabold text-foreground">Community</Text>
        <View className="flex-row items-center gap-3">
          {user.isPro && (
            <View className="bg-accent/30 px-2 py-1 rounded-md flex-row items-center gap-1">
              <Ionicons name="star" size={10} color="#2b3040" />
              <Text className="text-[10px] font-bold tracking-wider text-accent-foreground">PRO</Text>
            </View>
          )}
          <Pressable className="w-10 h-10 rounded-full bg-muted items-center justify-center">
            <Ionicons name="search" size={18} color="#2b3040" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16, gap: 8 }}
      >
        {FILTERS.map((filter) => {
          const active = filter === activeFilter;
          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full ${active ? "bg-secondary" : "bg-muted"}`}
            >
              <Text className={`text-sm font-bold ${active ? "text-white" : "text-muted-foreground"}`}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => router.push(`/recipe/${item.id}`)}
            onLike={() => toggleLike(item.id)}
          />
        )}
      />

      <Pressable
        onPress={() => router.push("/meal/new")}
        className="absolute bottom-24 right-6 w-16 h-16 bg-primary rounded-full shadow-2xl items-center justify-center active:scale-95"
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </StyledSafeAreaView>
  );
}
