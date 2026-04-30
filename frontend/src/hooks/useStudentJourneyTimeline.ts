import { studentJourneyRepository } from "@/repository";

export function useStudentJourneyTimeline() {
  const events = studentJourneyRepository.listPrimaryStudentJourney();

  return {
    events,
    latestEvents: events.slice(0, 6),
  };
}
