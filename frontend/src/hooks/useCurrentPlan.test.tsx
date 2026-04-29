import { act, renderHook } from "@testing-library/react-native";

import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { Providers } from "@/test-utils/renderWithProviders";

import { useCurrentPlan } from "./useCurrentPlan";

describe("useCurrentPlan", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

  it("exposes current plan actions", () => {
    const { result } = renderHook(() => useCurrentPlan(), { wrapper: Providers });

    act(() => {
      result.current.updateTrainingDayNotes("training-day-1", "Ajuste via hook");
    });

    expect(
      result.current.currentPlan.trainingPlan.days.find((day) => day.id === "training-day-1")
        ?.notes
    ).toBe("Ajuste via hook");
  });
});
