import { useMemo } from "react";

import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useStudentWorkoutStore } from "@/store/useStudentWorkoutStore";
import { getCurrentWeekday, getWeekdayLabel } from "@/utils/weekdays";

export function useStudentTodayWorkout() {
  const { currentPlan } = useCurrentPlan();
  const toggleExercise = useStudentWorkoutStore((state) => state.toggleExercise);
  const resetDay = useStudentWorkoutStore((state) => state.resetDay);
  const isExerciseCompleted = useStudentWorkoutStore(
    (state) => state.isExerciseCompleted
  );
  const completedByDay = useStudentWorkoutStore((state) => state.completedByDay);

  const todayWeekday = getCurrentWeekday();
  const todayTraining = useMemo(
    () =>
      currentPlan.trainingPlan.days.find((day) => day.weekday === todayWeekday) ??
      currentPlan.trainingPlan.days[0],
    [currentPlan.trainingPlan.days, todayWeekday]
  );

  const completedExercises = todayTraining ? completedByDay[todayTraining.id] ?? [] : [];
  const totalExercises = todayTraining?.exercises.length ?? 0;
  const completedCount = completedExercises.length;

  return {
    allDays: currentPlan.trainingPlan.days,
    todayTraining,
    todayWeekday,
    todayLabel: getWeekdayLabel(todayTraining?.weekday ?? todayWeekday),
    completedCount,
    totalExercises,
    completedExercises,
    isExerciseCompleted,
    toggleExercise,
    resetDay,
    completionRate:
      totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0,
  };
}
