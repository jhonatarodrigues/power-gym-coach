import { create } from "zustand";

interface StudentWorkoutState {
  completedByDay: Record<string, string[]>;
  toggleExercise: (dayId: string, exerciseId: string) => void;
  resetDay: (dayId: string) => void;
  isExerciseCompleted: (dayId: string, exerciseId: string) => boolean;
  getCompletedCount: (dayId: string) => number;
  reset: () => void;
}

export const useStudentWorkoutStore = create<StudentWorkoutState>((set, get) => ({
  completedByDay: {},
  toggleExercise: (dayId, exerciseId) =>
    set((state) => {
      const current = state.completedByDay[dayId] ?? [];
      const nextCompleted = current.includes(exerciseId)
        ? current.filter((id) => id !== exerciseId)
        : [...current, exerciseId];

      return {
        completedByDay: {
          ...state.completedByDay,
          [dayId]: nextCompleted,
        },
      };
    }),
  resetDay: (dayId) =>
    set((state) => ({
      completedByDay: {
        ...state.completedByDay,
        [dayId]: [],
      },
    })),
  isExerciseCompleted: (dayId, exerciseId) =>
    (get().completedByDay[dayId] ?? []).includes(exerciseId),
  getCompletedCount: (dayId) => (get().completedByDay[dayId] ?? []).length,
  reset: () => set({ completedByDay: {} }),
}));
