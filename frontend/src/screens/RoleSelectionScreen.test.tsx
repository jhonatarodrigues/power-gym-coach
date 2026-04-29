import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { useMockSessionStore } from "@/store/useMockSessionStore";

import { RoleSelectionScreen } from "./RoleSelectionScreen";

describe("RoleSelectionScreen", () => {
  beforeEach(() => {
    useMockSessionStore.getState().signOut();
  });

  it("renders the app name and allows entering as teacher", () => {
    renderWithProviders(<RoleSelectionScreen />);

    expect(screen.getByText("Power Gym Coach")).toBeTruthy();

    fireEvent.press(screen.getByText("Entrar como professor"));

    expect(useMockSessionStore.getState().session.accessLevel).toBe("teacher");
  });

  it("allows entering as student", () => {
    renderWithProviders(<RoleSelectionScreen />);

    fireEvent.press(screen.getByText("Entrar como aluno"));

    expect(useMockSessionStore.getState().session.accessLevel).toBe("student");
  });
});
