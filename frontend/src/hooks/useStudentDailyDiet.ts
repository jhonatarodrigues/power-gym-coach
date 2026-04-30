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

  return {
    meals: currentPlan.dietPlan.meals,
    toggleMealItem,
    addWater,
    getConsumedCount,
    consumedMealItems,
    todayKey,
    waterTarget,
    waterIntake,
  };
}
