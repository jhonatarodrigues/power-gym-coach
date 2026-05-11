import { act, fireEvent, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { useStudentDietStore } from "@/store/useStudentDietStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { StudentDietScreen } from "./StudentDietScreen";

describe("StudentDietScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().reset();
      useMockSessionStore.getState().signInAs("student");
      useStudentDietStore.getState().reset();
    });
  });

  it("renders diet meals and increases water intake", () => {
    renderWithProviders(<StudentDietScreen />);

    expect(screen.getByText("Dieta do dia")).toBeTruthy();
    expect(screen.getByText("Distribuição de refeições")).toBeTruthy();
    expect(screen.getByText("Água")).toBeTruthy();
    fireEvent.press(screen.getByText("+250 ml"));

    expect(useStudentDietStore.getState().getWaterIntake("2026-04-30")).toBe(0.25);
  });
});
