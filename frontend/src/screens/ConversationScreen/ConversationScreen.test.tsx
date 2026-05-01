import { act, fireEvent, screen } from "@testing-library/react-native";

import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useConversationStore } from "@/store/useConversationStore";
import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ConversationScreen } from "./ConversationScreen";

describe("ConversationScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().reset();
      useMockSessionStore.getState().signInAs("teacher");
      useCoachContextStore.getState().reset();
      useConversationStore.getState().reset();
    });
  });

  it("shows conversation and allows a reply", () => {
    renderWithProviders(<ConversationScreen />);

    expect(screen.getByText("Mensagens")).toBeTruthy();
    expect(screen.getByText("Marina Costa")).toBeTruthy();

    fireEvent.changeText(screen.getByLabelText("Nova mensagem"), "Resposta teste");
    fireEvent.press(screen.getByText("Enviar mensagem"));

    expect(
      useConversationStore.getState().messages.some((message) => message.body === "Resposta teste")
    ).toBe(true);
  });
});
