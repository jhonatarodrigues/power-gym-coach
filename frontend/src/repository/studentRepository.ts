import {
  mockStudentJourneyRepository,
  mockStudentOverviewRepository,
} from "@/repository/mock";

export { mockStudentJourneyRepository as studentJourneyRepository };
export { mockStudentOverviewRepository as studentOverviewRepository };
export type {
  StudentJourneyEvent,
  StudentJourneyRepository,
  StudentOverview,
  StudentOverviewRepository,
} from "@/repository/contracts";
