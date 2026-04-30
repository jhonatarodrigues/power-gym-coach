import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useStudentDietStore } from "@/store/useStudentDietStore";

export function useStudentDailyDiet() {
  const { currentPlan } = useCurrentPlan();
  const toggleMealItem = useStudentDietStore((state) => state.toggleMealItem);
  const addWater = useStudentDietStore((state) => state.addWater);
  const getConsumedCount = useStudentDietStore((state) => state.getConsumedCount);
  const consumedMealItems = useStudentDietStore((state) => state.consumedMealItems);
  const getWaterIntake = useStudentDietStore((state) => state.getWaterIntake);
  const todayKey = "2026-04-30";
  const waterTarget = currentPlan.dietPlan.waterLitersTarget;
  const waterIntake = getWaterIntake(todayKey);
  const consumedCalories = currentPlan.dietPlan.meals.reduce((total, meal) => {
    const consumedIds = consumedMealItems[meal.id] ?? [];

    return (
      total +
      meal.items.reduce(
        (mealTotal, item) => mealTotal + (consumedIds.includes(item.id) ? item.calories : 0),
        0
      )
    );
  }, 0);
  const remainingCalories = Math.max(0, currentPlan.dietPlan.calories - consumedCalories);

  return {
    meals: currentPlan.dietPlan.meals,
    toggleMealItem,
    addWater,
    getConsumedCount,
    consumedMealItems,
    todayKey,
    waterTarget,
    waterIntake,
    consumedCalories,
    remainingCalories,
  };
}
