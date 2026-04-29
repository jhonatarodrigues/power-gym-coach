import type {
  AssessmentReview,
  AssessmentSubmission,
  ExamRequest,
  ExamUpload,
  HistoryRecord,
  Plan,
  ProgressEntry,
  StudentProfile,
  User,
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

export interface StudentOverview {
  studentProfile: StudentProfile;
  studentUser: User;
  currentPlanTitle: string;
  latestAssessmentSummary?: string;
  latestAssessmentSuggestedChanges?: string;
  latestProgress?: ProgressEntry;
  pendingExamCount: number;
  latestHistory?: HistoryRecord;
  nextRecommendedAction: string;
}

export interface StudentOverviewRepository {
  getPrimaryStudentOverview: () => StudentOverview;
}
