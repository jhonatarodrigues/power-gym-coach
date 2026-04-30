import { useStudentDietStore } from "@/store/useStudentDietStore";

describe("useStudentDietStore", () => {
  beforeEach(() => {
    useStudentDietStore.getState().reset();
  });

  it("toggles a consumed meal item", () => {
    useStudentDietStore.getState().toggleMealItem("meal-1", "item-1");

    expect(useStudentDietStore.getState().getConsumedCount("meal-1")).toBe(1);
  });

  it("tracks water intake per day", () => {
    useStudentDietStore.getState().addWater("2026-04-30", 0.5);
    useStudentDietStore.getState().addWater("2026-04-30", 0.25);

    expect(useStudentDietStore.getState().getWaterIntake("2026-04-30")).toBe(0.75);
  });
});
