import React, { useState, useCallback, useMemo } from "react";
import { AppContext, Meal, Recipe, LeaderboardEntry, User } from "./store";

const INITIAL_USER: User = {
  name: "You",
  avatar: "https://avatars.githubusercontent.com/u/174045140?v=4",
  level: 12,
  xp: 450,
  xpForNextLevel: 600,
  streakDays: 5,
  league: "Prep Cook",
  leaguePosition: 5,
  isPro: false,
};

const INITIAL_RECIPES: Recipe[] = [
  {
    id: "r1",
    title: "Artisan Pesto Pizza",
    author: { name: "Chef Sara", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    image:
      "https://ggrhecslgdflloszjkwl.supabase.co/storage/v1/object/public/user-assets/Yfr0Z0BsytT/components/qXpOhio9iea.png",
    cuisine: "Italian",
    timeMinutes: 25,
    servings: 2,
    complexity: "Medium",
    likes: 1200,
    comments: 84,
    cookedCount: 428,
    liked: true,
    tag: "Italian",
    ingredients: [
      "1 ball of fresh pizza dough",
      "1/2 cup basil pesto sauce",
      "8 oz fresh mozzarella pearls",
      "1/2 cup cherry tomatoes, halved",
      "Fresh basil leaves, for garnish",
      "Extra virgin olive oil",
    ],
  },
  {
    id: "r2",
    title: "Healthy Salmon Bowl",
    author: { name: "Chef Marco", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    image:
      "https://ggrhecslgdflloszjkwl.supabase.co/storage/v1/object/public/user-assets/Yfr0Z0BsytT/components/gFs0oUQcB9p.png",
    cuisine: "Quick",
    timeMinutes: 15,
    servings: 1,
    complexity: "Quick",
    likes: 850,
    comments: 42,
    cookedCount: 150,
    liked: false,
    tag: "Quick",
    ingredients: [
      "6 oz salmon fillet",
      "1 cup cooked jasmine rice",
      "1/2 avocado, sliced",
      "1/2 cup edamame",
      "Soy sauce and sesame seeds to taste",
    ],
  },
];

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Sous Sara", avatar: "https://randomuser.me/api/portraits/women/44.jpg", xp: 1820 },
  { rank: 2, name: "Chef Marco", avatar: "https://randomuser.me/api/portraits/men/32.jpg", xp: 1450 },
  { rank: 3, name: "Baker Jen", avatar: "https://randomuser.me/api/portraits/women/67.jpg", xp: 1210 },
  { rank: 4, name: "Tom G.", avatar: "https://randomuser.me/api/portraits/men/12.jpg", xp: 980, streak: 12 },
  {
    rank: 5,
    name: "You",
    avatar: "https://avatars.githubusercontent.com/u/174045140?v=4",
    xp: 850,
    streak: 5,
    isYou: true,
  },
  { rank: 6, name: "Elena R.", avatar: "https://randomuser.me/api/portraits/women/22.jpg", xp: 720 },
  {
    rank: 25,
    name: "Slow Cooker Mike",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    xp: 120,
    inDemotionZone: true,
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [meals, setMeals] = useState<Meal[]>([
    { id: "m1", name: "Breakfast", cuisine: "Italian", complexity: "Quick", xp: 50, loggedAt: Date.now() - 3 * 3600000 },
    { id: "m2", name: "Lunch", cuisine: "Asian", complexity: "Medium", xp: 50, loggedAt: Date.now() - 1 * 3600000 },
  ]);
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [leaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");

  const logMeal = useCallback((meal: Omit<Meal, "id" | "loggedAt">) => {
    const newMeal: Meal = { ...meal, id: `m${Date.now()}`, loggedAt: Date.now() };
    setMeals((prev) => [...prev, newMeal]);
    setUser((prev) => ({ ...prev, xp: prev.xp + meal.xp }));
  }, []);

  const toggleLike = useCallback((recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.id === recipeId ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r,
      ),
    );
  }, []);

  const cookRecipe = useCallback((recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, cookedCount: r.cookedCount + 1 } : r)),
    );
    setUser((prev) => ({ ...prev, xp: prev.xp + 120 }));
  }, []);

  const selectPlan = useCallback((plan: "monthly" | "annual") => setSelectedPlan(plan), []);
  const upgradeToPro = useCallback(() => setUser((prev) => ({ ...prev, isPro: true })), []);

  const value = useMemo(
    () => ({
      user,
      meals,
      mealGoal: 3,
      recipes,
      leaderboard,
      selectedPlan,
      logMeal,
      toggleLike,
      cookRecipe,
      selectPlan,
      upgradeToPro,
    }),
    [user, meals, recipes, leaderboard, selectedPlan, logMeal, toggleLike, cookRecipe, selectPlan, upgradeToPro],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
