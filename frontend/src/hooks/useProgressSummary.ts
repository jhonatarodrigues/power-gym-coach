import { progressRepository } from "@/repository";

function calculateDelta(current?: number, initial?: number) {
  if (current == null || initial == null) {
    return "0.0";
  }

  return (current - initial).toFixed(1);
}

export function useProgressSummary() {
  const entries = progressRepository.listEntries();
  const latestEntry = entries.at(-1);
  const firstEntry = entries[0];

  return {
    entries,
    latestEntry,
    firstEntry,
    weightDelta: calculateDelta(latestEntry?.weightKg, firstEntry?.weightKg),
    bodyFatDelta: calculateDelta(
      latestEntry?.bodyFatPercentage,
      firstEntry?.bodyFatPercentage
    ),
  };
}
