import { act, fireEvent, screen } from "@testing-library/react-native";

import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachStudentsScreen } from "./CoachStudentsScreen";

describe("CoachStudentsScreen", () => {
  it("renders a selectable student list", () => {
    renderWithProviders(<CoachStudentsScreen />);

    expect(screen.getAllByText("Alunos").length).toBeGreaterThan(0);
    expect(screen.getByText("Buscar aluno...")).toBeTruthy();
    expect(screen.getByText("Ações pendentes")).toBeTruthy();
    expect(screen.getByText("Lucas Andrade")).toBeTruthy();
    expect(screen.getAllByText("Plano atual").length).toBeGreaterThan(0);
    expect(screen.getByText("Plano Atual - Fase de Hipertrofia 01")).toBeTruthy();
  });

  it("selects the tapped student before opening the plans flow", () => {
    renderWithProviders(<CoachStudentsScreen />);

    fireEvent.press(screen.getByLabelText("Abrir planos de Lucas Andrade"));

    expect(useCoachContextStore.getState().selectedStudentId).toBe("user-student-2");
  });

  it("opens the current plan directly from the action button", () => {
    renderWithProviders(<CoachStudentsScreen />);

    fireEvent.press(screen.getAllByText("Abrir atual")[0]);

    expect(useCoachContextStore.getState().selectedStudentId).toBe("user-student-1");
    expect(useCoachContextStore.getState().selectedPlanId).toBe("plan-current-1");
    expect(useCurrentPlanStore.getState().currentPlan.id).toBe("plan-current-1");
  });
});
