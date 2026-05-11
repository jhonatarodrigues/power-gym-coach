import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { examRequestsMock, examUploadsMock } from "@/repository/mock";
import { useExamWorkflowStore } from "@/store/useExamWorkflowStore";
import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ExamsScreen } from "./ExamsScreen";

describe("ExamsScreen", () => {
  beforeEach(() => {
    useExamWorkflowStore.getState().reset();
  });

  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("shows teacher actions and exam uploads", async () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<ExamsScreen />);

    expect(screen.getByText("Linha do tempo")).toBeTruthy();
    expect(screen.getByText("Solicitar novo exame")).toBeTruthy();
    expect(screen.getByText("Abrir formulario de solicitacao")).toBeTruthy();
    expect(screen.getAllByText(examRequestsMock[0].title).length).toBeGreaterThan(0);
    expect(screen.getByText(examUploadsMock[0].fileName)).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Abrir solicitacao"));
    });

    await screen.findByPlaceholderText("Ex.: Ferritina + vitamina B12");

    await act(async () => {
      fireEvent.changeText(
        screen.getByPlaceholderText("Ex.: Ferritina + vitamina B12"),
        "Ferritina + vitamina B12"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Descreva o motivo e quando enviar."),
        "Solicitacao mockada para revisar fadiga, energia e recuperacao."
      );
      fireEvent.press(screen.getByText("Criar solicitacao mockada"));
    });

    expect(useExamWorkflowStore.getState().requests[0]?.title).toBe(
      "Ferritina + vitamina B12"
    );
  });

  it("lets the teacher review the latest sent exam", async () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<ExamsScreen />);

    fireEvent.press(screen.getByText("Abrir revisao do ultimo exame enviado"));

    await screen.findByPlaceholderText(
      "Descreva a leitura do exame e os proximos passos."
    );

    await act(async () => {
      fireEvent.changeText(
        screen.getByPlaceholderText(
          "Descreva a leitura do exame e os proximos passos."
        ),
        "Revisado e liberado para seguir o plano."
      );
      fireEvent.press(screen.getByText("Salvar revisao do exame"));
    });

    await waitFor(() => {
      expect(
        useExamWorkflowStore
          .getState()
          .requests.find((request) => request.reviewNote === "Revisado e liberado para seguir o plano.")
      ).toBeTruthy();
    });
  });

  it("shows student actions for the student role", async () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<ExamsScreen />);

    expect(screen.getByText("Abrir formulario de upload")).toBeTruthy();
    expect(screen.getByText("Ver plano atual")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Abrir upload"));
    });

    await screen.findByPlaceholderText("exame-abril-2026.pdf");

    await act(async () => {
      fireEvent.changeText(
        screen.getByPlaceholderText("exame-abril-2026.pdf"),
        "upload-mock-teste.pdf"
      );
      fireEvent.press(screen.getByText("Enviar upload mockado"));
    });

    await waitFor(() => {
      expect(
        useExamWorkflowStore
          .getState()
          .uploads.some((upload) => upload.fileName === "upload-mock-teste.pdf")
      ).toBe(true);
    });
  });

  it("does not upload when all requests are already reviewed", async () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
      useExamWorkflowStore.setState({
        requests: useExamWorkflowStore
          .getState()
          .requests.map((item) => ({ ...item, status: "reviewed" })),
      });
    });

    const initialUploadCount = useExamWorkflowStore.getState().uploads.length;

    renderWithProviders(<ExamsScreen />);

    act(() => {
      fireEvent.press(screen.getByText("Abrir upload"));
    });

    await screen.findByPlaceholderText("exame-abril-2026.pdf");

    await act(async () => {
      fireEvent.changeText(
        screen.getByPlaceholderText("exame-abril-2026.pdf"),
        "nao-deve-subir.pdf"
      );
      fireEvent.press(screen.getByText("Enviar upload mockado"));
    });

    expect(useExamWorkflowStore.getState().uploads).toHaveLength(initialUploadCount);
  });
});
