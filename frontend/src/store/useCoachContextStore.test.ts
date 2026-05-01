import { useCoachContextStore } from "@/store/useCoachContextStore";

describe("useCoachContextStore", () => {
  beforeEach(() => {
    useCoachContextStore.getState().reset();
  });

  it("lists more than one student and selects student plans", () => {
    const students = useCoachContextStore.getState().students;

    expect(students.length).toBeGreaterThan(1);

    useCoachContextStore.getState().selectStudent("user-student-2");

    expect(useCoachContextStore.getState().selectedStudentId).toBe("user-student-2");
    expect(
      useCoachContextStore.getState().getPlansByStudent("user-student-2").length
    ).toBeGreaterThan(0);
  });

  it("creates a new draft plan for the selected student", () => {
    const plan = useCoachContextStore.getState().createPlan({
      studentId: "user-student-1",
      title: "Plano novo",
      startDate: "2026-05-01",
      endDate: "2026-06-01",
    });

    expect(plan.status).toBe("draft");
    expect(useCoachContextStore.getState().selectedPlanId).toBe(plan.id);
  });
});
