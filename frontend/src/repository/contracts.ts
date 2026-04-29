import type {
  AssessmentReview,
  AssessmentSubmission,
  ExamRequest,
  ExamUpload,
  HistoryRecord,
  Plan,
  ProgressEntry,
} from "@/types";

export interface PlanRepository {
  getCurrentPlan: () => Plan;
  getArchivedPlans: () => Plan[];
}

export interface AssessmentRepository {
  listSubmissions: () => AssessmentSubmission[];
  listReviews: () => AssessmentReview[];
}

export interface ExamRepository {
  listRequests: () => ExamRequest[];
  listUploads: () => ExamUpload[];
}

export interface ProgressRepository {
  listEntries: () => ProgressEntry[];
  listHistory: () => HistoryRecord[];
}
