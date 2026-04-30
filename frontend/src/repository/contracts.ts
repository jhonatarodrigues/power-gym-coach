import type {
  AssessmentReview,
  AssessmentSubmission,
  ExamRequestStatus,
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
  submitAssessment: (input: {
    studentId: string;
    teacherId: string;
    description: string;
  }) => AssessmentSubmission;
  createReview: (input: {
    submissionId: string;
    teacherId: string;
    summary: string;
    observations: string;
    suggestedChanges?: string;
    createdNewPlan: boolean;
  }) => AssessmentReview;
}

export interface ExamRepository {
  listRequests: () => ExamRequest[];
  listUploads: () => ExamUpload[];
  requestExam: (input: {
    teacherId: string;
    studentId: string;
    title: string;
    note?: string;
  }) => ExamRequest;
  uploadExam: (input: {
    examRequestId: string;
    studentId: string;
    fileName: string;
  }) => ExamUpload | null;
  updateRequestStatus: (
    examRequestId: string,
    status: ExamRequestStatus
  ) => ExamRequest | null;
  reviewExam: (input: {
    examRequestId: string;
    reviewNote: string;
  }) => ExamRequest | null;
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

export interface StudentJourneyEvent {
  id: string;
  date: string;
  domain: "assessment" | "exam" | "progress" | "history" | "plan";
  title: string;
  description: string;
  highlight?: string;
  statusLabel?: string;
  priority?: "high" | "medium" | "low";
  pending?: boolean;
}

export interface StudentJourneyRepository {
  listPrimaryStudentJourney: () => StudentJourneyEvent[];
}
