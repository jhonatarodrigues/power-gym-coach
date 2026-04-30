import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { useMockSessionStore } from "@/store/useMockSessionStore";

import { RoleSelectionScreen } from "./RoleSelectionScreen";

describe("RoleSelectionScreen", () => {
  beforeEach(() => {
    useMockSessionStore.getState().reset();
  });

  it("renders the app name and allows entering as teacher with email and senha", async () => {
    renderWithProviders(<RoleSelectionScreen />);

    expect(screen.getByText("Power Gym Coach")).toBeTruthy();
    fireEvent.changeText(screen.getByLabelText("Email"), "rafael@powergymcoach.app");
    fireEvent.changeText(screen.getByLabelText("Senha"), "Rafael123");

    fireEvent.press(screen.getByText("Entrar"));

    await waitFor(() =>
      expect(useMockSessionStore.getState().session.accessLevel).toBe("teacher")
    );
  });

  it("allows entering as student after switching the selected role", async () => {
    renderWithProviders(<RoleSelectionScreen />);

    fireEvent.press(screen.getByText("Aluno"));
    fireEvent.changeText(screen.getByLabelText("Email"), "marina@powergymcoach.app");
    fireEvent.changeText(screen.getByLabelText("Senha"), "Marina123");
    fireEvent.press(screen.getByText("Entrar"));

    await waitFor(() =>
      expect(useMockSessionStore.getState().session.accessLevel).toBe("student")
    );
  });
});
