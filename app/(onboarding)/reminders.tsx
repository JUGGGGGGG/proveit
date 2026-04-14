import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { StyledSafeAreaView } from "@/components/styled";
import { IMAGES } from "@/constants/images";

const SLIDES = [
  {
    emoji: "😇",
    title: "Home cooking\nsaves you money",
    subtitle: "Average home meal is 3x cheaper than takeout!",
    cta: "REMIND ME TO COOK",
  },
  {
    emoji: "🥗",
    title: "Eat healthier,\nfeel better",
    subtitle: "Home-cooked meals have 50% fewer calories on average.",
    cta: "I'M IN",
  },
  {
    emoji: "🏆",
    title: "Level up your\nkitchen skills",
    subtitle: "Earn XP, climb leagues, and become a Master Chef.",
    cta: "LET'S GO",
  },
];

export default function RemindersScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const next = () => {
    if (index < SLIDES.length - 1) setIndex(index + 1);
    else router.replace("/(tabs)");
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center px-6 py-4">
        <View className="w-full flex-row justify-end mb-6">
          <Pressable onPress={() => router.replace("/(tabs)")}>
            <Text className="text-muted-foreground text-sm font-bold tracking-widest">SKIP</Text>
          </Pressable>
        </View>

        <View className="items-center mb-10">
          <Text className="text-3xl font-extrabold text-foreground mb-2 text-center">
            Smart Reminders
          </Text>
          <Text className="text-muted-foreground text-sm text-center">
            Healthy notifications when you forget to cook
          </Text>
        </View>

        <View className="w-full flex-1 items-center">
          <View className="w-full aspect-[4/5] bg-secondary rounded-[2.5rem] p-8 items-center justify-between shadow-lg overflow-hidden">
            <View className="items-center mt-4 z-10">
              <Text className="text-6xl mb-6">{slide.emoji}</Text>
              <Text className="text-white text-3xl font-extrabold text-center leading-tight">
                {slide.title}
              </Text>
              <Text className="text-white/80 mt-4 text-base font-medium text-center px-4">
                {slide.subtitle}
              </Text>
            </View>
            <Image
              source={{ uri: IMAGES.mascotEncouraging }}
              className="h-32 w-32 mt-auto"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="flex-row gap-2 my-8">
          {SLIDES.map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-secondary" : "bg-muted"}`}
            />
          ))}
        </View>

        <View className="w-full pb-4">
          <Pressable
            onPress={next}
            className="w-full bg-primary active:bg-primary/90 py-5 rounded-[2rem] shadow-md items-center active:scale-95"
          >
            <Text className="text-primary-foreground font-bold tracking-wide">{slide.cta}</Text>
          </Pressable>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
