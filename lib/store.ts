import { createContext, useContext } from "react";

export type User = {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpForNextLevel: number;
  streakDays: number;
  league: string;
  leaguePosition: number;
  isPro: boolean;
};

export type Meal = {
  id: string;
  name: string;
  cuisine: string;
  complexity: "Quick" | "Medium" | "Elaborate";
  xp: number;
  loggedAt: number;
  image?: string;
};

export type Recipe = {
  id: string;
  title: string;
  author: { name: string; avatar: string };
  image: string;
  cuisine: string;
  timeMinutes: number;
  servings: number;
  complexity: "Quick" | "Medium" | "Elaborate";
  likes: number;
  comments: number;
  cookedCount: number;
  liked: boolean;
  tag?: string;
  ingredients: string[];
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  streak?: number;
  isYou?: boolean;
  inDemotionZone?: boolean;
};

export type AppState = {
  user: User;
  meals: Meal[];
  mealGoal: number;
  recipes: Recipe[];
  leaderboard: LeaderboardEntry[];
  selectedPlan: "monthly" | "annual";
};

export type AppActions = {
  logMeal: (meal: Omit<Meal, "id" | "loggedAt">) => void;
  toggleLike: (recipeId: string) => void;
  cookRecipe: (recipeId: string) => void;
  selectPlan: (plan: "monthly" | "annual") => void;
  upgradeToPro: () => void;
};

export const AppContext = createContext<(AppState & AppActions) | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
