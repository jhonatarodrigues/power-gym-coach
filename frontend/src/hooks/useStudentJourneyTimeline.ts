import { studentJourneyRepository } from "@/repository";

export function useStudentJourneyTimeline() {
  const events = studentJourneyRepository.listPrimaryStudentJourney();
  const latestEvents = events.slice(0, 6);
  const pendingEvents = events.filter((event) => event.pending);
  const highPriorityEvents = events.filter((event) => event.priority === "high");
  const countsByDomain = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.domain] = (acc[event.domain] ?? 0) + 1;
    return acc;
  }, {});

  return {
    events,
    latestEvents,
    pendingEvents,
    highPriorityEvents,
    countsByDomain,
  };
}
