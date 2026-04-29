import type {
  AssessmentRepository,
  ExamRepository,
  PlanRepository,
  ProgressRepository,
  StudentOverviewRepository,
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
  studentProfilesMock,
  usersMock,
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

export const mockStudentOverviewRepository: StudentOverviewRepository = {
  getPrimaryStudentOverview: () => {
    const studentProfile = studentProfilesMock[0];
    const studentUser = usersMock.find((user) => user.id === studentProfile.userId);
    const latestProgress = progressEntriesMock.at(-1);
    const latestReview = assessmentReviewsMock[0];
    const latestHistory = historyRecordsMock.at(-1);
    const pendingExamCount = examRequestsMock.filter(
      (request) =>
        request.studentId === studentProfile.userId && request.status !== "reviewed"
    ).length;

    if (!studentUser) {
      throw new Error("Primary student user not found in mock repository.");
    }

    return {
      studentProfile,
      studentUser,
      currentPlanTitle: currentPlanMock.title,
      latestAssessmentSummary: latestReview?.summary,
      latestAssessmentSuggestedChanges: latestReview?.suggestedChanges,
      latestProgress,
      pendingExamCount,
      latestHistory,
      nextRecommendedAction:
        pendingExamCount > 0
          ? "Revisar exames pendentes antes de consolidar o proximo ajuste."
          : "Plano pronto para nova revisao de treino e dieta.",
    };
  },
};
