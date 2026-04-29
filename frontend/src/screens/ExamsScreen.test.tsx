import { act, fireEvent, screen } from "@testing-library/react-native";

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

  it("shows teacher actions and exam uploads", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<ExamsScreen />);

    expect(screen.getByText("Solicitar novo exame mockado")).toBeTruthy();
    expect(screen.getByText(examRequestsMock[0].title)).toBeTruthy();
    expect(screen.getByText(examUploadsMock[0].fileName)).toBeTruthy();

    fireEvent.press(screen.getByText("Solicitar novo exame mockado"));

    expect(useExamWorkflowStore.getState().requests[0]?.title).toBe(
      "Ferritina + vitamina B12"
    );
  });

  it("shows student actions for the student role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<ExamsScreen />);

    expect(screen.getByText("Enviar exame mockado")).toBeTruthy();
    expect(screen.getByText("Ver plano atual")).toBeTruthy();

    fireEvent.press(screen.getByText("Enviar exame mockado"));

    expect(useExamWorkflowStore.getState().uploads[0]?.fileName).toContain(
      "upload-mock-"
    );
  });

  it("does not upload when all requests are already reviewed", () => {
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

    fireEvent.press(screen.getByText("Enviar exame mockado"));

    expect(useExamWorkflowStore.getState().uploads).toHaveLength(initialUploadCount);
  });
});
