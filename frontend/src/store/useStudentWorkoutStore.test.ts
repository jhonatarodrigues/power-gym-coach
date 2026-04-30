import { act } from "@testing-library/react-native";

import { useStudentWorkoutStore } from "@/store/useStudentWorkoutStore";

describe("useStudentWorkoutStore", () => {
  beforeEach(() => {
    useStudentWorkoutStore.getState().reset();
  });

  it("toggles exercise completion for a day", () => {
    act(() => {
      useStudentWorkoutStore
        .getState()
        .toggleExercise("training-day-1", "training-exercise-1");
    });

    expect(
      useStudentWorkoutStore
        .getState()
        .isExerciseCompleted("training-day-1", "training-exercise-1")
    ).toBe(true);

    act(() => {
      useStudentWorkoutStore
        .getState()
        .toggleExercise("training-day-1", "training-exercise-1");
    });

    expect(
      useStudentWorkoutStore
        .getState()
        .isExerciseCompleted("training-day-1", "training-exercise-1")
    ).toBe(false);
  });

  it("resets the progress for a day", () => {
    act(() => {
      useStudentWorkoutStore
        .getState()
        .toggleExercise("training-day-1", "training-exercise-1");
      useStudentWorkoutStore
        .getState()
        .toggleExercise("training-day-1", "training-exercise-2");
      useStudentWorkoutStore.getState().resetDay("training-day-1");
    });

    expect(useStudentWorkoutStore.getState().getCompletedCount("training-day-1")).toBe(0);
  });
});
