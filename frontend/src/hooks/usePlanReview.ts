import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import type { TrainingDay } from "@/types";

function countTrainingDayChanges(currentDay: TrainingDay, savedDay: TrainingDay) {
  let score = 0;

  if (currentDay.notes !== savedDay.notes) {
    score += 1;
  }

  if (currentDay.exercises.length !== savedDay.exercises.length) {
    score += 1;
  }

  return score;
}

export function usePlanReview() {
  const { currentPlan, savedPlan, hasUnsavedChanges } = useCurrentPlan();

  const trainingChanges = currentPlan.trainingPlan.days.reduce((count, day) => {
    const savedDay = savedPlan.trainingPlan.days.find(
      (savedTrainingDay) => savedTrainingDay.id === day.id
    );

    if (!savedDay) {
      return count + 1;
    }

    return count + countTrainingDayChanges(day, savedDay);
  }, 0);

  const mealChanges = currentPlan.dietPlan.meals.reduce((count, meal) => {
    const savedMeal = savedPlan.dietPlan.meals.find(
      (savedDietMeal) => savedDietMeal.id === meal.id
    );

    if (!savedMeal) {
      return count + 1;
    }

    let score = 0;

    if (meal.items.length !== savedMeal.items.length) {
      score += 1;
    }

    if (meal.observation !== savedMeal.observation) {
      score += 1;
    }

    if (meal.calories !== savedMeal.calories) {
      score += 1;
    }

    return count + score;
  }, 0);

  const supplementChanges =
    Math.abs(
      currentPlan.dietPlan.supplements.length - savedPlan.dietPlan.supplements.length
    ) + (currentPlan.dietPlan.notes !== savedPlan.dietPlan.notes ? 1 : 0);

  const changedSections = [
    trainingChanges > 0 ? "Treino" : null,
    mealChanges > 0 ? "Dieta" : null,
    supplementChanges > 0 ? "Suplementacao" : null,
  ].filter(Boolean) as string[];

  return {
    trainingChanges,
    mealChanges,
    supplementChanges,
    changedSections,
    changedSectionCount: changedSections.length,
    hasUnsavedChanges,
  };
}
