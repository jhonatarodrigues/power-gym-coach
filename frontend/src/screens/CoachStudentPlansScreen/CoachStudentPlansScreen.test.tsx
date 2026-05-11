import { act, fireEvent, screen } from "@testing-library/react-native";

import { useCoachContextStore } from "@/store/useCoachContextStore";
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
    expect(screen.getAllByText("Plano Atual - Fase de Hipertrofia 01").length).toBeGreaterThan(0);
    expect(screen.getByText("Plano Anterior - Adaptacao Metabolica")).toBeTruthy();
  });

  it("keeps the selected plan when opening a cycle card", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByLabelText("Abrir plano Plano Anterior - Adaptacao Metabolica"));

    expect(useCoachContextStore.getState().selectedPlanId).toBe("plan-archived-1");
  });

  it("lets the coach open the current plan card", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByLabelText("Abrir plano Plano Atual - Fase de Hipertrofia 01"));
    expect(useCoachContextStore.getState().selectedPlanId).toBe("plan-current-1");
  });

  it("lets the coach open the create plan CTA", () => {
    renderWithProviders(<CoachStudentPlansScreen />);

    fireEvent.press(screen.getByText("Cadastrar novo plano"));
  });
});
