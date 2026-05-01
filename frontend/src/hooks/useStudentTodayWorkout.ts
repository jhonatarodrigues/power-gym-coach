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
    () => {
      const matchedDayIndex = currentPlan.trainingPlan.days.findIndex(
        (day) => day.weekday === todayWeekday
      );
      const matchedDay =
        matchedDayIndex >= 0 ? currentPlan.trainingPlan.days[matchedDayIndex] : undefined;

      if (matchedDay && matchedDay.exercises.length > 0) {
        return matchedDay;
      }

      for (let index = matchedDayIndex - 1; index >= 0; index -= 1) {
        const previousDay = currentPlan.trainingPlan.days[index];

        if (previousDay.exercises.length > 0) {
          return previousDay;
        }
      }

      for (
        let index = matchedDayIndex + 1;
        index < currentPlan.trainingPlan.days.length;
        index += 1
      ) {
        const nextDay = currentPlan.trainingPlan.days[index];

        if (nextDay.exercises.length > 0) {
          return nextDay;
        }
      }

      return matchedDay ?? currentPlan.trainingPlan.days[0];
    },
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
