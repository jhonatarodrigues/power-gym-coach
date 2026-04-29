import type {
  AssessmentRepository,
  ExamRepository,
  PlanRepository,
  ProgressRepository,
} from "@/repository/contracts";

import {
  archivedPlansMock,
  assessmentReviewsMock,
  assessmentSubmissionsMock,
  currentPlanMock,
  examRequestsMock,
  examUploadsMock,
  historyRecordsMock,
  progressEntriesMock,
} from "./index";

export const mockPlanRepository: PlanRepository = {
  getCurrentPlan: () => currentPlanMock,
  getArchivedPlans: () => archivedPlansMock,
};

export const mockAssessmentRepository: AssessmentRepository = {
  listSubmissions: () => assessmentSubmissionsMock,
  listReviews: () => assessmentReviewsMock,
};

export const mockExamRepository: ExamRepository = {
  listRequests: () => examRequestsMock,
  listUploads: () => examUploadsMock,
};

export const mockProgressRepository: ProgressRepository = {
  listEntries: () => progressEntriesMock,
  listHistory: () => historyRecordsMock,
};
