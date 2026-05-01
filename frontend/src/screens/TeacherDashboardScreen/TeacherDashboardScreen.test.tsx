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

    expect(screen.getByText("Painel mais limpo para decidir rapido")).toBeTruthy();
    expect(screen.getByText("Panorama da operacao")).toBeTruthy();
    expect(screen.getByText("Acoes prioritarias")).toBeTruthy();
    expect(screen.getByText("Carteira de alunos")).toBeTruthy();
    expect(screen.queryByText("Abrir pagamentos")).toBeNull();
  });
});
