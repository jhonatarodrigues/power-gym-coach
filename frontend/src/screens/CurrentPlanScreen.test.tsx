import { act, fireEvent, screen } from "@testing-library/react-native";

import { currentPlanMock } from "@/repository/mock";
import { useMockSessionStore } from "@/store/useMockSessionStore";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CurrentPlanScreen } from "./CurrentPlanScreen";

describe("CurrentPlanScreen", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

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

  it("shows unsaved changes state and allows discarding them", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
      useCurrentPlanStore
        .getState()
        .updateTrainingDayNotes("training-day-1", "Alteracao em aberto");
    });

    renderWithProviders(<CurrentPlanScreen />);

    expect(
      screen.getByText("Voce possui alteracoes nao salvas no plano atual.")
    ).toBeTruthy();

    fireEvent.press(screen.getByText("Descartar alteracoes"));

    expect(
      useCurrentPlanStore.getState().currentPlan.trainingPlan.days[0]?.notes
    ).toBe(currentPlanMock.trainingPlan.days[0]?.notes);
  });

  it("hides teacher-only actions for student role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<CurrentPlanScreen />);

    expect(screen.queryByText("Editar treino atual")).toBeNull();
  });
});
