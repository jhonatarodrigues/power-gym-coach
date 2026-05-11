import { formatCurrency, getPaymentStatusLabel, getPaymentStatusTone } from "./payments";

describe("payment utils", () => {
  it("formats values in BRL", () => {
    expect(formatCurrency(189.9)).toBe("R$ 189,90");
  });

  it("returns the right labels for every payment status", () => {
    expect(getPaymentStatusLabel("paid")).toBe("Pago");
    expect(getPaymentStatusLabel("pending")).toBe("Pendente");
    expect(getPaymentStatusLabel("gracePeriod")).toBe("Prazo de 3 dias");
    expect(getPaymentStatusLabel("overdue")).toBe("Atrasado");
    expect(getPaymentStatusLabel("inactive")).toBe("Inativo");
  });

  it("returns the right tone for every payment status", () => {
    expect(getPaymentStatusTone("paid")).toBe("success");
    expect(getPaymentStatusTone("pending")).toBe("warning");
    expect(getPaymentStatusTone("gracePeriod")).toBe("info");
    expect(getPaymentStatusTone("overdue")).toBe("info");
    expect(getPaymentStatusTone("inactive")).toBe("info");
  });
});
