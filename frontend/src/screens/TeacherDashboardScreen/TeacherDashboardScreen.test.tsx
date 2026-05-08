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

    expect(screen.getByText("Dashboard do coach")).toBeTruthy();
    expect(screen.getByText("Visao geral")).toBeTruthy();
    expect(screen.getByText("Engajamento semanal")).toBeTruthy();
    expect(screen.getByText("Progresso medio dos alunos")).toBeTruthy();
    expect(screen.getByText("Alunos em destaque")).toBeTruthy();
    expect(screen.queryByText("Abrir pagamentos")).toBeNull();
  });
});
