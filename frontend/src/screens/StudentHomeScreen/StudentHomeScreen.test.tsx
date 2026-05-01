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

    expect(screen.getByText("Power Gym Coach")).toBeTruthy();
    expect(screen.getByText("calorias consumidas hoje")).toBeTruthy();
    expect(screen.getByText("0")).toBeTruthy();
    expect(screen.getByText("Treinos da semana")).toBeTruthy();
    expect(screen.getByText("Abrir treino do dia")).toBeTruthy();
    expect(screen.getByText("Sua leitura rapida do dia")).toBeTruthy();
    expect(screen.getByText("Abrir dieta de hoje")).toBeTruthy();
    expect(screen.getByText("Ver pagamentos")).toBeTruthy();
  });
});
