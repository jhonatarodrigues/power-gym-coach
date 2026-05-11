import { usePaymentStore } from "@/store/usePaymentStore";

describe("usePaymentStore", () => {
  beforeEach(() => {
    usePaymentStore.getState().reset();
  });

  it("pays an open record and updates the record status", () => {
    usePaymentStore.getState().payRecord("payment-platform-apr", "pix");

    const record = usePaymentStore
      .getState()
      .paymentRecords.find((currentRecord) => currentRecord.id === "payment-platform-apr");

    expect(record?.status).toBe("paid");
    expect(record?.method).toBe("pix");
  });

  it("computes the expected teacher revenue", () => {
    expect(usePaymentStore.getState().getTeacherExpectedRevenue("user-teacher-1")).toBe(300);
  });

  it("computes the collected teacher revenue", () => {
    expect(usePaymentStore.getState().getTeacherCollectedRevenue("user-teacher-1")).toBe(300);
  });

  it("returns student payment status and teacher plan records", () => {
    expect(usePaymentStore.getState().getPaymentStatusByStudent("user-student-1")).toBe(
      "gracePeriod"
    );
    expect(usePaymentStore.getState().getTeacherStudentPlanRecords("user-teacher-1")).toHaveLength(3);
  });

  it("allows the teacher to create a commercial plan with included features", () => {
    usePaymentStore.getState().addTeacherPlan({
      teacherId: "user-teacher-1",
      name: "Plano premium",
      billingCycle: "yearly",
      monthlyAmount: 249.9,
      description: "Plano completo com entregas ampliadas.",
      includedFeatures: ["diet", "training", "assessment", "exams"],
    });

    const plan = usePaymentStore.getState().teacherPlans[0];

    expect(plan?.name).toBe("Plano premium");
    expect(plan?.includedFeatures).toEqual(["diet", "training", "assessment", "exams"]);
  });
});
