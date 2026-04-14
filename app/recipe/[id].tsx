import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledLinearGradient } from "@/components/styled";
import { useApp } from "@/lib/store";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { recipes, toggleLike, cookRecipe } = useApp();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-foreground">Recipe not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
        <View className="w-full relative" style={{ aspectRatio: 4 / 3 }}>
          <Image source={{ uri: recipe.image }} className="w-full h-full" resizeMode="cover" />
          <StyledLinearGradient
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="absolute inset-0"
          />
          <Pressable
            onPress={() => router.back()}
            className="absolute top-12 left-6 w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </Pressable>
          <Pressable
            onPress={() => toggleLike(recipe.id)}
            className="absolute top-12 right-6 w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons name={recipe.liked ? "heart" : "heart-outline"} size={22} color="#fff" />
          </Pressable>
        </View>

        <View className="px-6 -mt-12">
          <View className="bg-card rounded-[2.5rem] p-8 shadow-lg border border-border/30">
            <View className="mb-4">
              <Text className="text-3xl font-extrabold text-foreground mb-2">{recipe.title}</Text>
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center gap-2">
                  <Image source={{ uri: recipe.author.avatar }} className="w-6 h-6 rounded-full" />
                  <Text className="text-xs font-bold text-muted-foreground">
                    {recipe.author.name}
                  </Text>
                </View>
                <Pressable className="px-3 py-1 bg-secondary/10 rounded-full">
                  <Text className="text-[10px] font-bold tracking-widest text-secondary">FOLLOW</Text>
                </Pressable>
              </View>
            </View>

            <View className="flex-row py-6 border-y border-border/50">
              <View className="flex-1 items-center gap-1">
                <Ionicons name="time" size={22} color="#55b4d4" />
                <Text className="text-[10px] font-bold text-muted-foreground tracking-wider">
                  {recipe.timeMinutes} MINS
                </Text>
              </View>
              <View className="flex-1 items-center gap-1 border-x border-border/50">
                <Ionicons name="people" size={22} color="#55b4d4" />
                <Text className="text-[10px] font-bold text-muted-foreground tracking-wider">
                  {recipe.servings} SERVINGS
                </Text>
              </View>
              <View className="flex-1 items-center gap-1">
                <Ionicons name="restaurant" size={22} color="#55b4d4" />
                <Text className="text-[10px] font-bold text-muted-foreground tracking-wider">
                  {recipe.complexity.toUpperCase()}
                </Text>
              </View>
            </View>

            <View className="pt-6">
              <Text className="text-lg font-extrabold text-foreground mb-4">Ingredients</Text>
              <View className="gap-3">
                {recipe.ingredients.map((ing, i) => (
                  <View
                    key={i}
                    className="flex-row items-center gap-3 bg-secondary/5 p-4 rounded-2xl"
                  >
                    <Ionicons name="checkmark-circle" size={18} color="#55b4d4" />
                    <Text className="text-sm font-medium text-foreground flex-1">{ing}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-8 left-6 right-6">
        <Pressable
          onPress={() => {
            cookRecipe(recipe.id);
            router.push("/leagues/result");
          }}
          className="w-full bg-primary active:bg-primary/90 py-6 rounded-[2rem] shadow-2xl flex-row items-center justify-center gap-3 active:scale-95"
        >
          <Ionicons name="flame" size={22} color="#fde08b" />
          <Text className="text-primary-foreground font-bold tracking-widest">
            I COOKED THIS! (+120 XP)
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
