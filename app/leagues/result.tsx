import { View, Text, Pressable, Image, Share } from "react-native";
import { useRouter } from "expo-router";
import { StyledSafeAreaView } from "@/components/styled";
import { ConfettiDots, CELEBRATION_DOTS } from "@/components/ConfettiDots";
import { IMAGES } from "@/constants/images";

export default function LeagueResultScreen() {
  const router = useRouter();

  const share = async () => {
    try {
      await Share.share({
        message: "I just got promoted to Sous Chef on PlateUp! 🎉 Join me: https://plateup.app",
      });
    } catch {}
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center px-6">
        <ConfettiDots dots={CELEBRATION_DOTS} />

        <View className="z-10 mb-8 items-center">
          <Image source={{ uri: IMAGES.mascotPromoted }} className="w-64 h-64" resizeMode="contain" />
        </View>

        <View className="z-10 items-center">
          <Text className="text-4xl font-extrabold text-foreground mb-4 text-center">
            Promoted to{"\n"}Sous Chef!
          </Text>
          <Text className="text-muted-foreground font-medium mb-12 text-lg text-center max-w-xs">
            You've reached the big leagues! Your kitchen skills are reaching new heights.
          </Text>

          <View className="w-full max-w-xs gap-4">
            <Pressable
              onPress={() => router.dismissAll ? router.dismissAll() : router.replace("/(tabs)")}
              className="w-full bg-primary active:bg-primary/90 py-5 rounded-full shadow-lg items-center active:scale-95"
            >
              <Text className="text-primary-foreground font-bold tracking-widest">KEEP COOKING</Text>
            </Pressable>
            <Pressable
              onPress={share}
              className="w-full bg-muted active:bg-muted/80 py-4 rounded-full items-center active:scale-95"
            >
              <Text className="text-foreground font-bold tracking-widest text-sm">SHARE SUCCESS</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
