import { act, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { TeacherDashboardScreen } from "./TeacherDashboardScreen";

describe("TeacherDashboardScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });
  });

  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("renders dashboard highlights and navigation actions", () => {
    renderWithProviders(<TeacherDashboardScreen />);

    expect(screen.getByText("Dashboard do professor")).toBeTruthy();
    expect(screen.getByText("Abrir dados do aluno")).toBeTruthy();
    expect(screen.getByText("Abrir editor de treino")).toBeTruthy();
    expect(screen.getByText("Abrir pagamentos")).toBeTruthy();
  });
});
