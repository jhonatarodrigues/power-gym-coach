import { create } from "zustand";

import { currentPlanMock, foodLibraryMock } from "@/repository/mock";
import type {
  FoodLibraryItem,
  Meal,
  MealItem,
  Plan,
  Supplement,
  TrainingExercise,
} from "@/types";

interface AddExerciseInput {
  dayId: string;
  exerciseId: string;
  exerciseName: string;
  sets: string;
  reps: string;
  restSeconds: number;
  executionNotes?: string;
}

interface AddMealItemInput {
  mealId: string;
  foodId: string;
  amount: number;
  observation?: string;
}

interface CurrentPlanState {
  currentPlan: Plan;
  savedPlan: Plan;
  hasUnsavedChanges: boolean;
  lastSavedAt: string;
  loadCurrentPlan: (plan: Plan) => void;
  resetCurrentPlan: () => void;
  saveCurrentPlan: () => void;
  discardCurrentPlanChanges: () => void;
  updateTrainingDayNotes: (dayId: string, notes: string) => void;
  addExerciseToDay: (input: AddExerciseInput) => void;
  updateMealObservation: (mealId: string, observation: string) => void;
  addMealItemToMeal: (input: AddMealItemInput) => void;
  addSupplement: (input: Omit<Supplement, "id">) => void;
  applyAssessmentSuggestedChanges: (summary: string, suggestedChanges?: string) => void;
}

function clonePlan(plan: Plan): Plan {
  return JSON.parse(JSON.stringify(plan)) as Plan;
}

function roundToOneDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

function calculateFoodTotals(food: FoodLibraryItem, amount: number) {
  const factor = amount / food.baseAmount;

  return {
    calories: roundToOneDecimal(food.calories * factor),
    carbs: roundToOneDecimal(food.carbs * factor),
    protein: roundToOneDecimal(food.protein * factor),
    fat: roundToOneDecimal(food.fat * factor),
    fiber: roundToOneDecimal((food.fiber ?? 0) * factor),
  };
}

function calculateMealTotals(items: MealItem[]) {
  return items.reduce(
    (acc, item) => ({
      calories: roundToOneDecimal(acc.calories + item.calories),
      carbs: roundToOneDecimal(acc.carbs + item.carbs),
      protein: roundToOneDecimal(acc.protein + item.protein),
      fat: roundToOneDecimal(acc.fat + item.fat),
      fiber: roundToOneDecimal((acc.fiber ?? 0) + (item.fiber ?? 0)),
    }),
    {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
    }
  );
}

function calculateDietTotals(meals: Meal[], supplements: Plan["dietPlan"]["supplements"]) {
  return [...meals, ...supplements].reduce(
    (acc, item) => ({
      calories: roundToOneDecimal(acc.calories + item.calories),
      carbs: roundToOneDecimal(acc.carbs + item.carbs),
      protein: roundToOneDecimal(acc.protein + item.protein),
      fat: roundToOneDecimal(acc.fat + item.fat),
      fiber: roundToOneDecimal((acc.fiber ?? 0) + (item.fiber ?? 0)),
    }),
    {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
    }
  );
}

function withUpdatedTimestamp(plan: Plan): Plan {
  return {
    ...plan,
    updatedAt: new Date().toISOString(),
  };
}

function hasPlanChanged(currentPlan: Plan, savedPlan: Plan) {
  return JSON.stringify(currentPlan) !== JSON.stringify(savedPlan);
}

function createStateFromPlan(currentPlan: Plan, savedPlan: Plan) {
  return {
    currentPlan,
    savedPlan,
    hasUnsavedChanges: hasPlanChanged(currentPlan, savedPlan),
    lastSavedAt: savedPlan.updatedAt,
  };
}

export const useCurrentPlanStore = create<CurrentPlanState>((set) => ({
  ...createStateFromPlan(clonePlan(currentPlanMock), clonePlan(currentPlanMock)),
  loadCurrentPlan: (plan) => {
    const nextPlan = clonePlan(plan);

    set(createStateFromPlan(nextPlan, clonePlan(plan)));
  },
  resetCurrentPlan: () => {
    const initialPlan = clonePlan(currentPlanMock);

    set(createStateFromPlan(initialPlan, clonePlan(currentPlanMock)));
  },
  saveCurrentPlan: () =>
    set((state) => {
      const savedPlan = clonePlan(state.currentPlan);

      return createStateFromPlan(savedPlan, savedPlan);
    }),
  discardCurrentPlanChanges: () =>
    set((state) => {
      const restoredPlan = clonePlan(state.savedPlan);

      return createStateFromPlan(restoredPlan, clonePlan(state.savedPlan));
    }),
  updateTrainingDayNotes: (dayId, notes) =>
    set((state) => {
      const nextPlan = withUpdatedTimestamp({
        ...state.currentPlan,
        trainingPlan: {
          ...state.currentPlan.trainingPlan,
          days: state.currentPlan.trainingPlan.days.map((day) =>
            day.id === dayId ? { ...day, notes } : day
          ),
        },
      });

      return createStateFromPlan(nextPlan, state.savedPlan);
    }),
  addExerciseToDay: (input) =>
    set((state) => {
      const nextPlan = withUpdatedTimestamp({
        ...state.currentPlan,
        trainingPlan: {
          ...state.currentPlan.trainingPlan,
          days: state.currentPlan.trainingPlan.days.map((day) => {
            if (day.id !== input.dayId) {
              return day;
            }

            const nextOrder = day.exercises.length + 1;
            const exercise: TrainingExercise = {
              id: `training-exercise-${input.dayId}-${Date.now()}`,
              exerciseId: input.exerciseId,
              exerciseName: input.exerciseName,
              sets: input.sets,
              reps: input.reps,
              restSeconds: input.restSeconds,
              executionNotes: input.executionNotes,
              order: nextOrder,
            };

            return {
              ...day,
              exercises: [...day.exercises, exercise],
            };
          }),
        },
      });

      return createStateFromPlan(nextPlan, state.savedPlan);
    }),
  updateMealObservation: (mealId, observation) =>
    set((state) => {
      const nextPlan = withUpdatedTimestamp({
        ...state.currentPlan,
        dietPlan: {
          ...state.currentPlan.dietPlan,
          meals: state.currentPlan.dietPlan.meals.map((meal) =>
            meal.id === mealId ? { ...meal, observation } : meal
          ),
        },
      });

      return createStateFromPlan(nextPlan, state.savedPlan);
    }),
  addMealItemToMeal: ({ mealId, foodId, amount, observation }) =>
    set((state) => {
      const food = foodLibraryMock.find((item) => item.id === foodId);

      if (!food) {
        return state;
      }

      const totals = calculateFoodTotals(food, amount);

      const meals = state.currentPlan.dietPlan.meals.map((meal) => {
        if (meal.id !== mealId) {
          return meal;
        }

        const nextItem: MealItem = {
          id: `meal-item-${mealId}-${Date.now()}`,
          foodId: food.id,
          foodName: food.name,
          amount,
          unit: food.baseUnit,
          observation,
          ...totals,
        };

        return {
          ...meal,
          observation: observation || meal.observation,
          items: [...meal.items, nextItem],
          ...calculateMealTotals([...meal.items, nextItem]),
        };
      });

      const nextPlan = withUpdatedTimestamp({
        ...state.currentPlan,
        dietPlan: {
          ...state.currentPlan.dietPlan,
          meals,
          ...calculateDietTotals(meals, state.currentPlan.dietPlan.supplements),
        },
      });

      return createStateFromPlan(nextPlan, state.savedPlan);
    }),
  addSupplement: (input) =>
    set((state) => {
      const supplements = [
        ...state.currentPlan.dietPlan.supplements,
        {
          ...input,
          id: `supplement-${Date.now()}`,
        },
      ];

      const nextPlan = withUpdatedTimestamp({
        ...state.currentPlan,
        dietPlan: {
          ...state.currentPlan.dietPlan,
          supplements,
          ...calculateDietTotals(state.currentPlan.dietPlan.meals, supplements),
        },
      });

      return createStateFromPlan(nextPlan, state.savedPlan);
    }),
  applyAssessmentSuggestedChanges: (summary, suggestedChanges) =>
    set((state) => {
      const nextPlan = withUpdatedTimestamp({
        ...state.currentPlan,
        status: "draft",
        title: `${state.currentPlan.title} - Ajuste em revisao`,
        trainingPlan: {
          ...state.currentPlan.trainingPlan,
          notes: [state.currentPlan.trainingPlan.notes, summary, suggestedChanges]
            .filter(Boolean)
            .join(" "),
        },
        dietPlan: {
          ...state.currentPlan.dietPlan,
          notes: [state.currentPlan.dietPlan.notes, suggestedChanges]
            .filter(Boolean)
            .join(" "),
        },
      });

      return createStateFromPlan(nextPlan, state.savedPlan);
    }),
}));
