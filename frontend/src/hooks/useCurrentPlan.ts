import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";

export function useCurrentPlan() {
  const currentPlan = useCurrentPlanStore((state) => state.currentPlan);
  const resetCurrentPlan = useCurrentPlanStore((state) => state.resetCurrentPlan);
  const updateTrainingDayNotes = useCurrentPlanStore(
    (state) => state.updateTrainingDayNotes
  );
  const addExerciseToDay = useCurrentPlanStore((state) => state.addExerciseToDay);
  const updateMealObservation = useCurrentPlanStore(
    (state) => state.updateMealObservation
  );
  const addMealItemToMeal = useCurrentPlanStore((state) => state.addMealItemToMeal);

  return {
    currentPlan,
    resetCurrentPlan,
    updateTrainingDayNotes,
    addExerciseToDay,
    updateMealObservation,
    addMealItemToMeal,
  };
}
