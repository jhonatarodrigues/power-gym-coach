import { act, renderHook } from "@testing-library/react-native";

import { useStudentDietStore } from "@/store/useStudentDietStore";
import { Providers } from "@/test-utils/renderWithProviders";

import { useStudentDailyDiet } from "./useStudentDailyDiet";

describe("useStudentDailyDiet", () => {
  beforeEach(() => {
    useStudentDietStore.getState().reset();
  });

  it("starts with zero consumed calories", () => {
    const { result } = renderHook(() => useStudentDailyDiet(), {
      wrapper: Providers,
    });

    expect(result.current.consumedCalories).toBe(0);
    expect(result.current.remainingCalories).toBeGreaterThan(0);
  });

  it("adds consumed calories as meal items are checked", () => {
    act(() => {
      useStudentDietStore.getState().toggleMealItem("meal-1", "meal-item-1");
      useStudentDietStore.getState().toggleMealItem("meal-1", "meal-item-2");
    });

    const { result } = renderHook(() => useStudentDailyDiet(), {
      wrapper: Providers,
    });

    expect(result.current.consumedCalories).toBe(212);
    expect(result.current.remainingCalories).toBeGreaterThan(0);
  });
});
