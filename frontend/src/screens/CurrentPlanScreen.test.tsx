import { act, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CurrentPlanScreen } from "./CurrentPlanScreen";

describe("CurrentPlanScreen", () => {
  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("shows teacher editing actions for teacher role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<CurrentPlanScreen />);

    expect(screen.getByText("Editar treino atual")).toBeTruthy();
    expect(screen.getByText("Editar dieta atual")).toBeTruthy();
    expect(screen.getByText("Editar suplementacao")).toBeTruthy();
  });

  it("hides teacher-only actions for student role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<CurrentPlanScreen />);

    expect(screen.queryByText("Editar treino atual")).toBeNull();
  });
});
