import type { PaymentStatus } from "@/types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(value);
}

export function getPaymentStatusLabel(status: PaymentStatus) {
  switch (status) {
    case "paid":
      return "Pago";
    case "pending":
      return "Pendente";
    case "gracePeriod":
      return "Prazo de 3 dias";
    case "overdue":
      return "Atrasado";
    case "inactive":
      return "Inativo";
    default:
      return status;
  }
}

export function getPaymentStatusTone(status: PaymentStatus) {
  if (status === "paid") {
    return "success" as const;
  }

  if (status === "pending") {
    return "warning";
  }

  if (status === "gracePeriod" || status === "overdue" || status === "inactive") {
    return "info" as const;
  }

  return "default" as const;
}
