import type {
  AssessmentRepository,
  ExamRepository,
  PlanRepository,
  ProgressRepository,
  StudentJourneyRepository,
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
import { useAssessmentWorkflowStore } from "@/store/useAssessmentWorkflowStore";
import { useExamWorkflowStore } from "@/store/useExamWorkflowStore";

export const mockPlanRepository: PlanRepository = {
  getCurrentPlan: () => currentPlanMock,
  getArchivedPlans: () => archivedPlansMock,
};

export const mockAssessmentRepository: AssessmentRepository = {
  listSubmissions: () => useAssessmentWorkflowStore.getState().submissions,
  listReviews: () => useAssessmentWorkflowStore.getState().reviews,
  submitAssessment: ({ description, studentId, teacherId }) =>
    useAssessmentWorkflowStore
      .getState()
      .submitAssessment({ description, studentId, teacherId }),
};

export const mockExamRepository: ExamRepository = {
  listRequests: () => useExamWorkflowStore.getState().requests,
  listUploads: () => useExamWorkflowStore.getState().uploads,
  requestExam: ({ note, studentId, teacherId, title }) =>
    useExamWorkflowStore
      .getState()
      .requestExam({ note, studentId, teacherId, title }),
  uploadExam: ({ examRequestId, fileName, studentId }) =>
    useExamWorkflowStore
      .getState()
      .uploadExam({ examRequestId, fileName, studentId }),
  updateRequestStatus: (examRequestId, status) =>
    useExamWorkflowStore.getState().updateRequestStatus(examRequestId, status),
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
    const latestReview = mockAssessmentRepository.listReviews()[0];
    const latestHistory = historyRecordsMock.at(-1);
    const pendingExamCount = mockExamRepository.listRequests().filter(
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

export const mockStudentJourneyRepository: StudentJourneyRepository = {
  listPrimaryStudentJourney: () => {
    const studentId = studentProfilesMock[0].userId;
    const assessmentEvents = mockAssessmentRepository
      .listSubmissions()
      .filter((submission) => submission.studentId === studentId)
      .map((submission) => ({
        id: `assessment-${submission.id}`,
        date: submission.submittedAt.slice(0, 10),
        domain: "assessment" as const,
        title: "Avaliacao enviada",
        description: submission.description,
        highlight:
          submission.status === "pending"
            ? "Aguardando devolutiva do professor"
            : "Avaliacao revisada",
      }));

    const reviewEvents = mockAssessmentRepository
      .listReviews()
      .map((review) => ({
        id: `review-${review.id}`,
        date: review.reviewedAt.slice(0, 10),
        domain: "assessment" as const,
        title: "Devolutiva da avaliacao",
        description: review.summary,
        highlight: review.suggestedChanges,
      }));

    const examEvents = mockExamRepository
      .listRequests()
      .filter((request) => request.studentId === studentId)
      .map((request) => ({
        id: `exam-${request.id}`,
        date: request.requestedAt.slice(0, 10),
        domain: "exam" as const,
        title: request.title,
        description: request.note ?? "Solicitacao de exame sem observacao adicional.",
        highlight: `Status: ${request.status}`,
      }));

    const progressEvents = progressEntriesMock
      .filter((entry) => entry.studentId === studentId)
      .map((entry) => ({
        id: `progress-${entry.id}`,
        date: entry.date,
        domain: "progress" as const,
        title: `${entry.weightKg} kg / ${entry.bodyFatPercentage}% BF`,
        description: entry.notes ?? "Atualizacao de progresso.",
        highlight: `${entry.photos.length} fotos registradas`,
      }));

    const historyEvents = historyRecordsMock
      .filter((record) => record.studentId === studentId)
      .map((record) => ({
        id: `history-${record.id}`,
        date: record.date,
        domain: "history" as const,
        title: record.title,
        description: record.description ?? "Registro historico do aluno.",
      }));

    const planEvent = {
      id: `plan-${currentPlanMock.id}`,
      date: currentPlanMock.updatedAt.slice(0, 10),
      domain: "plan" as const,
      title: currentPlanMock.title,
      description: currentPlanMock.trainingPlan.notes ?? "Plano atual ativo.",
      highlight: currentPlanMock.status,
    };

    return [
      planEvent,
      ...assessmentEvents,
      ...reviewEvents,
      ...examEvents,
      ...progressEvents,
      ...historyEvents,
    ].sort((left, right) => right.date.localeCompare(left.date));
  },
};
