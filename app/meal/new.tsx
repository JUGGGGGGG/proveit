import { useState } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyledSafeAreaView } from "@/components/styled";
import { useApp } from "@/lib/store";
import { IMAGES } from "@/constants/images";

const CUISINES = ["Italian", "Asian", "Mexican", "Indian", "More +"] as const;
const COMPLEXITIES = ["Quick", "Medium", "Elaborate"] as const;

export default function MealLoggingScreen() {
  const router = useRouter();
  const { logMeal } = useApp();
  const [cuisine, setCuisine] = useState<string>("Italian");
  const [complexity, setComplexity] = useState<(typeof COMPLEXITIES)[number]>("Quick");
  const [photo] = useState(IMAGES.sampleMeal);
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    logMeal({
      name: `${cuisine} Meal`,
      cuisine,
      complexity,
      xp: 50,
      image: photo,
    });
    setTimeout(() => {
      router.back();
    }, 150);
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full flex-row justify-between items-center mb-8 pt-2">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2 rounded-full active:bg-muted">
            <Ionicons name="arrow-back" size={24} color="#2b3040" />
          </Pressable>
          <Text className="text-xl font-extrabold text-foreground">Add new meal</Text>
          <View className="w-8" />
        </View>

        <Pressable className="w-full aspect-square rounded-[2rem] bg-muted overflow-hidden relative mb-8 shadow-inner">
          <Image source={{ uri: photo }} className="w-full h-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/30 items-center justify-center">
            <Ionicons name="camera" size={48} color="#fff" />
            <Text className="text-white font-bold text-sm tracking-wide mt-2">Retake Photo</Text>
          </View>
        </Pressable>

        <View className="w-full mb-8">
          <Text className="text-xs font-bold text-muted-foreground tracking-widest mb-3 ml-1">
            CUISINE
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {CUISINES.map((c) => {
              const active = c === cuisine;
              return (
                <Pressable
                  key={c}
                  onPress={() => setCuisine(c)}
                  className={`px-4 py-2 rounded-full ${active ? "bg-secondary" : "bg-muted"}`}
                >
                  <Text
                    className={`text-sm font-bold ${active ? "text-white" : "text-foreground/70"}`}
                  >
                    {c}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="w-full mb-10">
          <Text className="text-xs font-bold text-muted-foreground tracking-widest mb-3 ml-1">
            COMPLEXITY
          </Text>
          <View className="flex-row bg-muted p-1.5 rounded-[1.5rem]">
            {COMPLEXITIES.map((level) => {
              const active = level === complexity;
              return (
                <Pressable
                  key={level}
                  onPress={() => setComplexity(level)}
                  className={`flex-1 py-2.5 rounded-2xl items-center ${
                    active ? "bg-card shadow-sm" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {level}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          onPress={submit}
          disabled={submitting}
          className="w-full bg-primary active:bg-primary/90 py-5 rounded-[2rem] shadow-md items-center active:scale-95"
        >
          <Text className="text-primary-foreground font-bold tracking-wide text-sm">
            {submitting ? "LOGGING..." : "LOG MEAL (+50 XP)"}
          </Text>
        </Pressable>
      </ScrollView>
    </StyledSafeAreaView>
  );
}
