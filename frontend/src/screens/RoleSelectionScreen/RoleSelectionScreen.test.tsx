import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { useMockSessionStore } from "@/store/useMockSessionStore";

import { RoleSelectionScreen } from "./RoleSelectionScreen";

describe("RoleSelectionScreen", () => {
  beforeEach(() => {
    useMockSessionStore.getState().reset();
  });

  it("renders the login intro and allows entering as teacher with email and senha", async () => {
    renderWithProviders(<RoleSelectionScreen />);

    expect(
      screen.getByText("Entre com email e senha. Escolha acima se o acesso e de coach ou aluno.")
    ).toBeTruthy();
    expect(screen.queryByText("Primeiro acesso do aluno")).toBeNull();

    fireEvent.press(screen.getByText("Entrar"));

    await waitFor(() =>
      expect(useMockSessionStore.getState().session.accessLevel).toBe("teacher")
    );
  });

  it("allows entering as student after switching the selected role", async () => {
    renderWithProviders(<RoleSelectionScreen />);

    fireEvent.press(screen.getByText("Aluno"));
    expect(screen.getByText("Primeiro acesso do aluno")).toBeTruthy();
    fireEvent.press(screen.getByText("Entrar"));

    await waitFor(() =>
      expect(useMockSessionStore.getState().session.accessLevel).toBe("student")
    );
  });
});
