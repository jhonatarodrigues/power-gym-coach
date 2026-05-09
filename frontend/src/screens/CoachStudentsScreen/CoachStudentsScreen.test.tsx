import { act, screen } from "@testing-library/react-native";

import { useCoachContextStore } from "@/store/useCoachContextStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachStudentsScreen } from "./CoachStudentsScreen";

describe("CoachStudentsScreen", () => {
  it("renders a selectable student list", () => {
    renderWithProviders(<CoachStudentsScreen />);

    expect(screen.getByText("Carteira organizada por aluno")).toBeTruthy();
    expect(screen.getByText("Carteira ativa")).toBeTruthy();
    expect(screen.getByText("Marina Costa")).toBeTruthy();
    expect(screen.getByText("Lucas Andrade")).toBeTruthy();
  });

  it("shows fallback status when a student has no plan", () => {
    act(() => {
      useCoachContextStore.setState({ plans: [] });
    });

    renderWithProviders(<CoachStudentsScreen />);

    expect(screen.getAllByText("Sem plano ativo").length).toBeGreaterThan(0);
  });
});
