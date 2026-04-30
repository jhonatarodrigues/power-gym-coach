import { progressRepository } from "@/repository";

function calculateDelta(current?: number, initial?: number) {
  if (current == null || initial == null) {
    return "0.0";
  }

  return (current - initial).toFixed(1);
}

function getDirectionLabel(delta: string, positiveLabel: string, negativeLabel: string) {
  const value = Number(delta);

  if (value > 0) {
    return positiveLabel;
  }

  if (value < 0) {
    return negativeLabel;
  }

  return "estavel";
}

function getNextCheckInDate(date?: string) {
  if (!date) {
    return "--";
  }

  const nextDate = new Date(`${date}T12:00:00.000Z`);
  nextDate.setUTCDate(nextDate.getUTCDate() + 14);

  return nextDate.toISOString().slice(0, 10);
}

export function useProgressSummary() {
  const entries = progressRepository.listEntries();
  const latestEntry = entries.at(-1);
  const firstEntry = entries[0];
  const previousEntry = entries.at(-2);
  const weightDelta = calculateDelta(latestEntry?.weightKg, firstEntry?.weightKg);
  const bodyFatDelta = calculateDelta(
    latestEntry?.bodyFatPercentage,
    firstEntry?.bodyFatPercentage
  );
  const latestPhotos = latestEntry?.photos ?? [];
  const previousWeightDelta = calculateDelta(
    latestEntry?.weightKg,
    previousEntry?.weightKg
  );
  const previousBodyFatDelta = calculateDelta(
    latestEntry?.bodyFatPercentage,
    previousEntry?.bodyFatPercentage
  );

  return {
    entries,
    latestEntry,
    firstEntry,
    previousEntry,
    latestPhotos,
    weightDelta,
    bodyFatDelta,
    previousWeightDelta,
    previousBodyFatDelta,
    weightDirection: getDirectionLabel(weightDelta, "ganho de peso", "reducao de peso"),
    bodyFatDirection: getDirectionLabel(
      bodyFatDelta,
      "aumento de gordura corporal",
      "reducao de gordura corporal"
    ),
    nextCheckInDate: getNextCheckInDate(latestEntry?.date),
    recentMomentum:
      Number(previousWeightDelta) > 0 || Number(previousBodyFatDelta) < 0
        ? "Resposta recente positiva no acompanhamento."
        : "Monitorar a proxima leitura para confirmar a direcao da evolucao.",
  };
}
