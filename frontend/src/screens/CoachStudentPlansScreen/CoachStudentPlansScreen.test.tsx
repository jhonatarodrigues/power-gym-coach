import { act, fireEvent, screen } from "@testing-library/react-native";

import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachStudentPlansScreen } from "./CoachStudentPlansScreen";

describe("CoachStudentPlansScreen", () => {
  beforeEach(() => {
    act(() => {
      useCoachContextStore.getState().reset();
      useCoachContextStore.getState().selectStudent("user-student-1");
    });
  });

  it("renders the selected student's plans", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    expect(screen.getByText("Planos do aluno")).toBeTruthy();
    expect(screen.getByText("Marina Costa")).toBeTruthy();
    expect(screen.getByText("Cadastrar novo plano")).toBeTruthy();
    expect(screen.getByText("Abrir plano atual")).toBeTruthy();
    expect(screen.getByText("Fluxo do plano atual")).toBeTruthy();
    expect(screen.getByText("Treino")).toBeTruthy();
    expect(screen.getByText("Exames")).toBeTruthy();
    expect(screen.getByText("Plano Anterior - Adaptacao Metabolica")).toBeTruthy();
  });

  it("keeps the selected plan when opening a cycle card", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByLabelText("Abrir plano Plano Anterior - Adaptacao Metabolica"));

    expect(useCoachContextStore.getState().selectedPlanId).toBe("plan-archived-1");
  });

  it("lets the coach open the current plan card", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByText("Abrir plano atual"));
    expect(useCoachContextStore.getState().selectedPlanId).toBe("plan-current-1");
  });

  it("lets the coach open the create plan CTA", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByText("Cadastrar novo plano"));
  });

  it("opens the diet shortcut from the current plan flow", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByText("Dieta"));
    expect(useCurrentPlanStore.getState().currentPlan.id).toBe("plan-current-1");
  });

  it("opens the training shortcut from the current plan flow", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByText("Treino"));
  });

  it("opens the assessment shortcut from the current plan flow", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByText("Avaliação"));
  });

  it("opens the exams shortcut from the current plan flow", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByText("Exames"));
  });
});
