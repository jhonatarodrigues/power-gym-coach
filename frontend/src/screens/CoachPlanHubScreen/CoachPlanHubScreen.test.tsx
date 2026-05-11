import { act, fireEvent, screen } from "@testing-library/react-native";

import { currentPlanMock } from "@/repository/mock";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachPlanHubScreen } from "./CoachPlanHubScreen";

describe("CoachPlanHubScreen", () => {
  beforeEach(() => {
    act(() => {
      useCoachContextStore.getState().reset();
      useCoachContextStore.getState().selectStudent("user-student-1");
      useCoachContextStore.getState().selectPlan("plan-current-1");
      useCurrentPlanStore.getState().loadCurrentPlan(currentPlanMock);
    });
  });

  it("renders the selected plan structure and coach actions", () => {
    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.getByText("Detalhe do plano")).toBeTruthy();
    expect(screen.getByText("Plano atual")).toBeTruthy();
    expect(screen.getByText("Módulos do plano")).toBeTruthy();
    expect(screen.getByText("Abrir avaliação")).toBeTruthy();
    expect(screen.getByText("Editar treino")).toBeTruthy();
    expect(screen.getByText("Editar dieta")).toBeTruthy();
    expect(screen.getByText("Progresso do plano")).toBeTruthy();
    expect(screen.getByText("Treino do plano")).toBeTruthy();
    expect(screen.getByText("Dieta do plano")).toBeTruthy();
    expect(screen.getByText("Observações do plano")).toBeTruthy();
    expect(screen.getByText("Suplementação")).toBeTruthy();
    expect(screen.getByText("Peito + triceps")).toBeTruthy();
    expect(screen.getByText("Cafe da manha")).toBeTruthy();
    expect(screen.getByText("Creatina")).toBeTruthy();
  });

  it("allows opening the assessment shortcut for the active plan", () => {
    renderWithProviders(<CoachPlanHubScreen />);

    fireEvent.press(screen.getByText("Abrir avaliação"));
  });

  it("allows opening the exam shortcut for the active plan", () => {
    renderWithProviders(<CoachPlanHubScreen />);

    fireEvent.press(screen.getByText("Abrir exames"));
  });

  it("allows opening the training editor shortcut for the active plan", () => {
    renderWithProviders(<CoachPlanHubScreen />);

    fireEvent.press(screen.getByText("Editar treino"));
  });

  it("allows opening the diet editor shortcut for the active plan", () => {
    renderWithProviders(<CoachPlanHubScreen />);

    fireEvent.press(screen.getByText("Editar dieta"));
  });

  it("keeps historical plans read only", () => {
    act(() => {
      useCoachContextStore.getState().selectPlan("plan-archived-1");
    });

    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.getByText("Plano histórico")).toBeTruthy();
    expect(screen.queryByText("Editar treino")).toBeNull();
    expect(screen.queryByText("Editar dieta")).toBeNull();
  });

  it("renders nothing when the selected plan is missing", () => {
    act(() => {
      useCoachContextStore.setState({ selectedPlanId: "" });
    });

    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.queryByText("Hub do plano do aluno")).toBeNull();
  });

  it("renders nothing when the selected student is missing", () => {
    act(() => {
      useCoachContextStore.setState({ selectedStudentId: "" });
    });

    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.queryByText("Hub do plano do aluno")).toBeNull();
  });
});
