import { create } from "zustand";

import { currentPlanMock, foodLibraryMock } from "@/repository/mock";
import type { FoodLibraryItem, Meal, MealItem, Plan, TrainingExercise } from "@/types";

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
  resetCurrentPlan: () => void;
  updateTrainingDayNotes: (dayId: string, notes: string) => void;
  addExerciseToDay: (input: AddExerciseInput) => void;
  updateMealObservation: (mealId: string, observation: string) => void;
  addMealItemToMeal: (input: AddMealItemInput) => void;
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

export const useCurrentPlanStore = create<CurrentPlanState>((set) => ({
  currentPlan: clonePlan(currentPlanMock),
  resetCurrentPlan: () => set({ currentPlan: clonePlan(currentPlanMock) }),
  updateTrainingDayNotes: (dayId, notes) =>
    set((state) => ({
      currentPlan: withUpdatedTimestamp({
        ...state.currentPlan,
        trainingPlan: {
          ...state.currentPlan.trainingPlan,
          days: state.currentPlan.trainingPlan.days.map((day) =>
            day.id === dayId ? { ...day, notes } : day
          ),
        },
      }),
    })),
  addExerciseToDay: (input) =>
    set((state) => ({
      currentPlan: withUpdatedTimestamp({
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
      }),
    })),
  updateMealObservation: (mealId, observation) =>
    set((state) => ({
      currentPlan: withUpdatedTimestamp({
        ...state.currentPlan,
        dietPlan: {
          ...state.currentPlan.dietPlan,
          meals: state.currentPlan.dietPlan.meals.map((meal) =>
            meal.id === mealId ? { ...meal, observation } : meal
          ),
        },
      }),
    })),
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

      return {
        currentPlan: withUpdatedTimestamp({
          ...state.currentPlan,
          dietPlan: {
            ...state.currentPlan.dietPlan,
            meals,
            ...calculateDietTotals(meals, state.currentPlan.dietPlan.supplements),
          },
        }),
      };
    }),
}));
