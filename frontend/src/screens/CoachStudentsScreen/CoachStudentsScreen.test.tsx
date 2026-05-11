import { act, fireEvent, screen } from "@testing-library/react-native";

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
  });

  it("selects the tapped student before opening the plans flow", () => {
    renderWithProviders(<CoachStudentsScreen />);

    fireEvent.press(screen.getByLabelText("Abrir planos de Lucas Andrade"));

    expect(useCoachContextStore.getState().selectedStudentId).toBe("user-student-2");
  });
});
