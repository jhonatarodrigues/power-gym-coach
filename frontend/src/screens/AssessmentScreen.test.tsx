import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { useAssessmentWorkflowStore } from "@/store/useAssessmentWorkflowStore";
import { useExamWorkflowStore } from "@/store/useExamWorkflowStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { useMockSessionStore } from "@/store/useMockSessionStore";

import { AssessmentScreen } from "./AssessmentScreen";

describe("AssessmentScreen", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
    useAssessmentWorkflowStore.getState().reset();
    useExamWorkflowStore.getState().reset();
  });

  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("shows teacher actions for the teacher role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<AssessmentScreen />);

    expect(screen.getByText("Aplicar sugestoes ao plano atual")).toBeTruthy();
    expect(screen.getByText("Solicitar novas fotos")).toBeTruthy();

    fireEvent.press(screen.getByText("Aplicar sugestoes ao plano atual"));

    expect(useCurrentPlanStore.getState().currentPlan.status).toBe("draft");
  });

  it("lets the teacher save a review and request follow-up labs", async () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<AssessmentScreen />);

    fireEvent.press(screen.getByText("Abrir formulario de revisao"));

    await screen.findByPlaceholderText("Escreva o resumo da avaliacao");

    await act(async () => {
      fireEvent.changeText(
        screen.getByPlaceholderText("Escreva o resumo da avaliacao"),
        "Resumo atualizado"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Descreva observacoes tecnicas"),
        "Observacoes atualizadas"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Quais ajustes devem entrar no proximo planejamento?"),
        "Solicitar novos exames"
      );
      fireEvent.press(screen.getByText("Salvar revisao mockada"));
    });

    await waitFor(() => {
      expect(useAssessmentWorkflowStore.getState().reviews[0]?.summary).toBe(
        "Resumo atualizado"
      );
    });

    fireEvent.press(screen.getByText("Solicitar follow-up laboratorial"));

    expect(
      useExamWorkflowStore
        .getState()
        .requests.some((request) => request.title === "Follow-up laboratorial pos-avaliacao")
    ).toBe(true);
  });

  it("shows student actions for the student role", async () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<AssessmentScreen />);

    expect(screen.getByText("Abrir formulario de avaliacao")).toBeTruthy();
    expect(screen.getByText("Ver plano atualizado")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Abrir formulario de envio"));
    });

    await screen.findByPlaceholderText(
      "Ex.: melhor resposta no treino, energia, digestao e aderencia."
    );

    await act(async () => {
      fireEvent.changeText(
        screen.getByPlaceholderText(
          "Ex.: melhor resposta no treino, energia, digestao e aderencia."
        ),
        "Nova avaliacao enviada pelo teste"
      );
      fireEvent.press(screen.getByText("Enviar avaliacao mockada"));
    });

    await waitFor(() => {
      expect(
        useAssessmentWorkflowStore
          .getState()
          .submissions.some(
            (submission) =>
              submission.description === "Nova avaliacao enviada pelo teste" &&
              submission.status === "pending"
          )
      ).toBe(true);
    });
  });

  it("shows waiting state when there is no review yet", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
      useAssessmentWorkflowStore.setState({ reviews: [] });
    });

    renderWithProviders(<AssessmentScreen />);

    expect(screen.getByText("Aguardando devolutiva do professor")).toBeTruthy();
  });
});
