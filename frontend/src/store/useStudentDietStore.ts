import { create } from "zustand";

interface StudentDietState {
  consumedMealItems: Record<string, string[]>;
  waterLitersByDate: Record<string, number>;
  toggleMealItem: (mealId: string, itemId: string) => void;
  addWater: (dateKey: string, liters: number) => void;
  getConsumedCount: (mealId: string) => number;
  getWaterIntake: (dateKey: string) => number;
  reset: () => void;
}

export const useStudentDietStore = create<StudentDietState>((set, get) => ({
  consumedMealItems: {},
  waterLitersByDate: {},
  toggleMealItem: (mealId, itemId) =>
    set((state) => {
      const currentItems = state.consumedMealItems[mealId] ?? [];
      const nextItems = currentItems.includes(itemId)
        ? currentItems.filter((currentId) => currentId !== itemId)
        : [...currentItems, itemId];

      return {
        consumedMealItems: {
          ...state.consumedMealItems,
          [mealId]: nextItems,
        },
      };
    }),
  addWater: (dateKey, liters) =>
    set((state) => ({
      waterLitersByDate: {
        ...state.waterLitersByDate,
        [dateKey]: Math.max(0, (state.waterLitersByDate[dateKey] ?? 0) + liters),
      },
    })),
  getConsumedCount: (mealId) => (get().consumedMealItems[mealId] ?? []).length,
  getWaterIntake: (dateKey) => get().waterLitersByDate[dateKey] ?? 0,
  reset: () => set({ consumedMealItems: {}, waterLitersByDate: {} }),
}));
