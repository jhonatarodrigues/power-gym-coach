import { act, renderHook } from "@testing-library/react-native";

import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { Providers } from "@/test-utils/renderWithProviders";
import type { Plan } from "@/types";

import { usePlanReview } from "./usePlanReview";

describe("usePlanReview", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

  it("reports no changed sections for the saved plan", () => {
    const { result } = renderHook(() => usePlanReview(), { wrapper: Providers });

    expect(result.current.changedSectionCount).toBe(0);
    expect(result.current.hasUnsavedChanges).toBe(false);
  });

  it("tracks draft changes across plan sections", () => {
    act(() => {
      useCurrentPlanStore
        .getState()
        .updateTrainingDayNotes("training-day-1", "Nova nota de execucao");
      useCurrentPlanStore
        .getState()
        .updateMealObservation("meal-1", "Novo ajuste de refeicao");
      useCurrentPlanStore.getState().addSupplement({
        name: "Creatina",
        timing: "Pos-treino",
        dosage: "5 g",
        observation: "Todos os dias",
        calories: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
      });
    });

    const { result } = renderHook(() => usePlanReview(), { wrapper: Providers });

    expect(result.current.changedSections).toEqual([
      "Treino",
      "Dieta",
      "Suplementacao",
    ]);
    expect(result.current.changedSectionCount).toBe(3);
  });

  it("counts sections even when the draft has new training days and meals", () => {
    act(() => {
      const state = useCurrentPlanStore.getState();
      const nextPlan = JSON.parse(JSON.stringify(state.currentPlan)) as Plan;

      nextPlan.trainingPlan.days.push({
        id: "training-day-extra",
        weekday: "saturday",
        title: "Extra session",
        notes: "Sessao adicional de mobilidade.",
        exercises: [],
      });
      nextPlan.dietPlan.meals.push({
        id: "meal-extra",
        type: "dinner",
        title: "Jantar extra",
        observation: "Ajuste pontual",
        calories: 120,
        carbs: 10,
        protein: 12,
        fat: 2,
        fiber: 1,
        items: [],
      });

      useCurrentPlanStore.setState({
        currentPlan: nextPlan,
        hasUnsavedChanges: true,
      });
    });

    const { result } = renderHook(() => usePlanReview(), { wrapper: Providers });

    expect(result.current.trainingChanges).toBeGreaterThan(0);
    expect(result.current.mealChanges).toBeGreaterThan(0);
  });
});
