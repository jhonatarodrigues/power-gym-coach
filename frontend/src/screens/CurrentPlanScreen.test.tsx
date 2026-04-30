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
    expect(screen.getByText("Review before save")).toBeTruthy();
    expect(screen.getByText("Estado de publicacao do plano")).toBeTruthy();
  });

  it("shows unsaved changes state and allows discarding them", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
      useCurrentPlanStore
        .getState()
        .updateTrainingDayNotes("training-day-1", "Alteracao em aberto");
      useCurrentPlanStore.getState().addSupplement({
        name: "Cafeina",
        timing: "Pre-treino",
        dosage: "200 mg",
        observation: "Somente treino pesado",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      });
    });

    renderWithProviders(<CurrentPlanScreen />);

    expect(
      screen.getByText("Voce possui alteracoes nao salvas no plano atual.")
    ).toBeTruthy();
    expect(screen.getByText("Secoes alteradas")).toBeTruthy();
    expect(screen.getByText("Diffs por secao")).toBeTruthy();

    fireEvent.press(screen.getByText("Descartar alteracoes"));

    expect(
      useCurrentPlanStore.getState().currentPlan.trainingPlan.days[0]?.notes
    ).toBe(currentPlanMock.trainingPlan.days[0]?.notes);
  });

  it("saves the current draft for teachers", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
      useCurrentPlanStore
        .getState()
        .updateTrainingDayNotes("training-day-1", "Salvar no teste");
    });

    renderWithProviders(<CurrentPlanScreen />);

    fireEvent.press(screen.getByText("Salvar alteracoes do plano"));

    expect(useCurrentPlanStore.getState().hasUnsavedChanges).toBe(false);
  });

  it("hides teacher-only actions for student role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<CurrentPlanScreen />);

    expect(screen.queryByText("Editar treino atual")).toBeNull();
    expect(screen.queryByText("Review before save")).toBeNull();
  });

  it("shows synced plan state when nothing changed", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<CurrentPlanScreen />);

    expect(screen.getByText("Plano atual sincronizado com a ultima versao salva.")).toBeTruthy();
    expect(screen.getByText("Pronto")).toBeTruthy();
  });
});
