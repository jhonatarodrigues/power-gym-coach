import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { FirstAccessScreen } from "./FirstAccessScreen";

describe("FirstAccessScreen", () => {
  beforeEach(() => {
    useMockSessionStore.getState().reset();
  });

  it("validates the invite email and completes first access", async () => {
    renderWithProviders(<FirstAccessScreen />);

    fireEvent.changeText(screen.getByLabelText("Email"), "novo.aluno@powergymcoach.app");
    fireEvent.press(screen.getByText("Validar convite"));
    fireEvent.changeText(screen.getByLabelText("Telefone ou WhatsApp"), "(11) 91111-2222");
    fireEvent.changeText(screen.getByLabelText("Senha"), "AlunoNovo1");
    fireEvent.press(screen.getByText("Concluir primeiro acesso"));

    await waitFor(() =>
      expect(useMockSessionStore.getState().session.accessLevel).toBe("student")
    );
  });
});
