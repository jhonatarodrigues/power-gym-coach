import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";

export function useCurrentPlan() {
  const currentPlan = useCurrentPlanStore((state) => state.currentPlan);
  const savedPlan = useCurrentPlanStore((state) => state.savedPlan);
  const hasUnsavedChanges = useCurrentPlanStore((state) => state.hasUnsavedChanges);
  const lastSavedAt = useCurrentPlanStore((state) => state.lastSavedAt);
  const resetCurrentPlan = useCurrentPlanStore((state) => state.resetCurrentPlan);
  const saveCurrentPlan = useCurrentPlanStore((state) => state.saveCurrentPlan);
  const discardCurrentPlanChanges = useCurrentPlanStore(
    (state) => state.discardCurrentPlanChanges
  );
  const updateTrainingDayNotes = useCurrentPlanStore(
    (state) => state.updateTrainingDayNotes
  );
  const addExerciseToDay = useCurrentPlanStore((state) => state.addExerciseToDay);
  const updateMealObservation = useCurrentPlanStore(
    (state) => state.updateMealObservation
  );
  const addMealItemToMeal = useCurrentPlanStore((state) => state.addMealItemToMeal);
  const addSupplement = useCurrentPlanStore((state) => state.addSupplement);
  const applyAssessmentSuggestedChanges = useCurrentPlanStore(
    (state) => state.applyAssessmentSuggestedChanges
  );

  return {
    currentPlan,
    savedPlan,
    hasUnsavedChanges,
    lastSavedAt,
    resetCurrentPlan,
    saveCurrentPlan,
    discardCurrentPlanChanges,
    updateTrainingDayNotes,
    addExerciseToDay,
    updateMealObservation,
    addMealItemToMeal,
    addSupplement,
    applyAssessmentSuggestedChanges,
  };
}
