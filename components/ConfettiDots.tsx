import { View } from "react-native";

type Dot = { top?: string; bottom?: string; left?: string; right?: string; w: number; h: number; color: string; rotate?: number; opacity?: number };

const ONBOARDING_DOTS: Dot[] = [
  { top: "5%", left: "15%", w: 8, h: 16, color: "#55b4d4", rotate: -45, opacity: 0.8 },
  { top: "15%", right: "18%", w: 12, h: 12, color: "#55b4d4", opacity: 0.8 },
  { bottom: "25%", left: "12%", w: 8, h: 20, color: "#55b4d4", rotate: 12, opacity: 0.8 },
  { top: "25%", left: "10%", w: 8, h: 8, color: "#fde08b", opacity: 0.9 },
  { top: "50%", right: "12%", w: 12, h: 24, color: "#fde08b", rotate: 45, opacity: 0.9 },
  { bottom: "15%", right: "22%", w: 8, h: 16, color: "#fde08b", rotate: -12, opacity: 0.9 },
  { top: "10%", right: "28%", w: 8, h: 20, color: "#f26d6d", rotate: 12, opacity: 0.8 },
  { top: "35%", left: "22%", w: 12, h: 12, color: "#f26d6d", opacity: 0.8 },
  { bottom: "22%", left: "30%", w: 8, h: 16, color: "#f26d6d", rotate: 45, opacity: 0.8 },
  { top: "40%", left: "40%", w: 8, h: 20, color: "#86d1a6", rotate: -12, opacity: 0.8 },
  { bottom: "30%", right: "30%", w: 12, h: 12, color: "#86d1a6", opacity: 0.8 },
];

export function ConfettiDots({ dots = ONBOARDING_DOTS }: { dots?: Dot[] }) {
  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <View
          key={i}
          style={{
            position: "absolute",
            top: d.top as any,
            bottom: d.bottom as any,
            left: d.left as any,
            right: d.right as any,
            width: d.w,
            height: d.h,
            backgroundColor: d.color,
            borderRadius: 999,
            opacity: d.opacity ?? 1,
            transform: [{ rotate: `${d.rotate ?? 0}deg` }],
          }}
        />
      ))}
    </View>
  );
}

export const CELEBRATION_DOTS: Dot[] = [
  { top: "20%", left: "20%", w: 8, h: 24, color: "#fde08b", rotate: 45 },
  { top: "30%", right: "20%", w: 12, h: 12, color: "#55b4d4", opacity: 0.6 },
  { bottom: "25%", left: "28%", w: 8, h: 16, color: "#f26d6d", rotate: -12 },
  { bottom: "30%", right: "28%", w: 12, h: 12, color: "#fde08b", opacity: 0.8 },
  { top: "40%", left: "10%", w: 8, h: 20, color: "#86d1a6", rotate: 20 },
  { top: "55%", right: "12%", w: 10, h: 10, color: "#f26d6d", opacity: 0.7 },
];
