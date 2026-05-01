import { act, renderHook } from "@testing-library/react-native";

import { useStudentWorkoutStore } from "@/store/useStudentWorkoutStore";
import { Providers } from "@/test-utils/renderWithProviders";

import { useStudentTodayWorkout } from "./useStudentTodayWorkout";

describe("useStudentTodayWorkout", () => {
  beforeEach(() => {
    act(() => {
      useStudentWorkoutStore.getState().reset();
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the exact workout when today already has exercises", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-04-13T12:00:00.000Z"));

    const { result } = renderHook(() => useStudentTodayWorkout(), {
      wrapper: Providers,
    });

    expect(result.current.todayTraining.id).toBe("training-day-1");
    expect(result.current.todayTraining.exercises[0]?.exerciseName).toBe(
      "Supino reto com barra"
    );
  });

  it("falls back to the nearest configured training day when today has no exercises", () => {
    const { result } = renderHook(() => useStudentTodayWorkout(), {
      wrapper: Providers,
    });

    expect(result.current.todayTraining.id).toBe("training-day-4");
    expect(result.current.todayTraining.exercises[0]?.exerciseName).toBe("Agachamento goblet");
  });

  it("calculates completion after marking an exercise", () => {
    act(() => {
      useStudentWorkoutStore
        .getState()
        .toggleExercise("training-day-4", "training-exercise-6");
    });

    const { result } = renderHook(() => useStudentTodayWorkout(), {
      wrapper: Providers,
    });

    expect(result.current.completedCount).toBe(1);
    expect(result.current.completionRate).toBe(50);
  });

  it("moves forward to the next configured day when today is outside the configured week", () => {
    jest.useFakeTimers().setSystemTime(new Date("2026-04-18T12:00:00.000Z"));

    const { result } = renderHook(() => useStudentTodayWorkout(), {
      wrapper: Providers,
    });

    expect(result.current.todayTraining.id).toBe("training-day-1");
  });
});
