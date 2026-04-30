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
    expect(usePaymentStore.getState().getTeacherExpectedRevenue("user-teacher-1")).toBe(169.9);
  });
});
