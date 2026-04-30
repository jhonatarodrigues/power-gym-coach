import { act, renderHook } from "@testing-library/react-native";

import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { Providers } from "@/test-utils/renderWithProviders";

import { useStudentOverview } from "./useStudentOverview";

describe("useStudentOverview", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

  it("returns the mocked overview enriched with current plan state", () => {
    const { result } = renderHook(() => useStudentOverview(), {
      wrapper: Providers,
    });

    expect(result.current.studentUser.name).toBe("Marina Costa");
    expect(result.current.trainingDaysCount).toBeGreaterThan(0);
    expect(result.current.currentPlanStatus).toBe("Plano atual salvo");
    expect(result.current.operationalSnapshot).toContain("dias de treino");
  });

  it("reflects the draft state when the current plan changes", () => {
    act(() => {
      useCurrentPlanStore
        .getState()
        .updateTrainingDayNotes("training-day-1", "Rascunho em revisao");
    });

    const { result } = renderHook(() => useStudentOverview(), {
      wrapper: Providers,
    });

    expect(result.current.currentPlanStatus).toBe(
      "Rascunho com ajustes em aberto"
    );
  });
});
