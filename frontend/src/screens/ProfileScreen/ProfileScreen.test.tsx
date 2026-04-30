import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ProfileScreen } from "./ProfileScreen";

describe("ProfileScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().reset();
      useMockSessionStore.getState().signInAs("teacher");
    });
  });

  it("updates editable profile fields", async () => {
    renderWithProviders(<ProfileScreen />);

    fireEvent.changeText(screen.getByLabelText("Nome"), "Rafael Atualizado");
    fireEvent.changeText(screen.getByLabelText("Telefone ou WhatsApp"), "(11) 90000-9999");
    fireEvent.changeText(screen.getByLabelText("Nova senha"), "NovaSenha1");
    fireEvent.press(screen.getByText("Salvar perfil"));

    await waitFor(() =>
      expect(useMockSessionStore.getState().session.currentUser?.name).toBe("Rafael Atualizado")
    );
  });
});
