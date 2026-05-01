import { act, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { StudentHomeScreen } from "./StudentHomeScreen";

describe("StudentHomeScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });
  });

  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("renders the student home summary and quick actions", () => {
    renderWithProviders(<StudentHomeScreen />);

    expect(screen.getByText("Calorias do dia")).toBeTruthy();
    expect(screen.getByText("Consumo por refeicao")).toBeTruthy();
    expect(screen.getByText("Treinos da semana")).toBeTruthy();
    expect(screen.getByText("Abrir treino do dia")).toBeTruthy();
    expect(screen.getByText("Atalhos do dia")).toBeTruthy();
    expect(screen.getByText("Abrir dieta de hoje")).toBeTruthy();
    expect(screen.getByText("Ver pagamentos")).toBeTruthy();
  });
});
