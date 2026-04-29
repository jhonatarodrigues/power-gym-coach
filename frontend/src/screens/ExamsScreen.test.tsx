import { act, screen } from "@testing-library/react-native";

import { examRequestsMock, examUploadsMock } from "@/repository/mock";
import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ExamsScreen } from "./ExamsScreen";

describe("ExamsScreen", () => {
  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("shows teacher actions and exam uploads", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<ExamsScreen />);

    expect(screen.getByText("Solicitar novo exame")).toBeTruthy();
    expect(screen.getByText(examRequestsMock[0].title)).toBeTruthy();
    expect(screen.getByText(examUploadsMock[0].fileName)).toBeTruthy();
  });

  it("shows student actions for the student role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<ExamsScreen />);

    expect(screen.getByText("Enviar exame mockado")).toBeTruthy();
    expect(screen.getByText("Ver historico de envios")).toBeTruthy();
  });
});
