import { act, screen } from "@testing-library/react-native";

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

    expect(screen.getByText(/Planos de Marina Costa/)).toBeTruthy();
    expect(screen.getByText("Cadastrar novo plano")).toBeTruthy();
    expect(screen.getByText("Plano Atual - Fase de Hipertrofia 01")).toBeTruthy();
  });
});
