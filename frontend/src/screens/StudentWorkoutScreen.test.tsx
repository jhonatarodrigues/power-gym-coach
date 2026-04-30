import { act, fireEvent, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { useStudentWorkoutStore } from "@/store/useStudentWorkoutStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { StudentWorkoutScreen } from "./StudentWorkoutScreen";

describe("StudentWorkoutScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
      useStudentWorkoutStore.getState().reset();
    });
  });

  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("renders the today workout and allows marking exercises", () => {
    renderWithProviders(<StudentWorkoutScreen />);

    expect(screen.getByText("Treino do dia")).toBeTruthy();
    expect(screen.getByText("Checklist do treino")).toBeTruthy();

    fireEvent.press(screen.getByText("Agachamento goblet"));

    expect(
      useStudentWorkoutStore
        .getState()
        .isExerciseCompleted("training-day-4", "training-exercise-6")
    ).toBe(true);
  });

  it("resets the marked exercises for the day", () => {
    act(() => {
      useStudentWorkoutStore
        .getState()
        .toggleExercise("training-day-4", "training-exercise-6");
    });

    renderWithProviders(<StudentWorkoutScreen />);

    fireEvent.press(screen.getByText("Reiniciar marcacoes do dia"));

    expect(useStudentWorkoutStore.getState().getCompletedCount("training-day-4")).toBe(0);
  });
});
