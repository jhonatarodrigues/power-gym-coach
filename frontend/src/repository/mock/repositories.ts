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

function getJourneyPriority(level: "high" | "medium" | "low") {
  return level;
}

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
  createReview: ({
    createdNewPlan,
    observations,
    submissionId,
    suggestedChanges,
    summary,
    teacherId,
  }) =>
    useAssessmentWorkflowStore.getState().createReview({
      createdNewPlan,
      observations,
      submissionId,
      suggestedChanges,
      summary,
      teacherId,
    }),
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
  reviewExam: ({ examRequestId, reviewNote }) =>
    useExamWorkflowStore.getState().reviewExam({ examRequestId, reviewNote }),
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
    const archivedPlans = mockPlanRepository.getArchivedPlans();
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
      currentPlanStartDate: currentPlanMock.startDate,
      currentPlanEndDate: currentPlanMock.endDate,
      latestAssessmentSummary: latestReview?.summary,
      latestAssessmentSuggestedChanges: latestReview?.suggestedChanges,
      latestProgress,
      pendingExamCount,
      latestHistory,
      archivedPlansCount: archivedPlans.length,
      latestArchivedPlan: archivedPlans[0],
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
        statusLabel: submission.status === "pending" ? "Pendente" : "Revisada",
        priority: getJourneyPriority(
          submission.status === "pending" ? "high" : "medium"
        ),
        pending: submission.status === "pending",
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
        statusLabel: review.createdNewPlan ? "Novo plano" : "Revisado",
        priority: getJourneyPriority(review.createdNewPlan ? "high" : "medium"),
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
        statusLabel:
          request.status === "pending"
            ? "Pendente"
            : request.status === "sent"
              ? "Enviado"
              : "Revisado",
        priority: getJourneyPriority(
          request.status === "pending"
            ? "high"
            : request.status === "sent"
              ? "medium"
              : "low"
        ),
        pending: request.status !== "reviewed",
        highlight: request.reviewNote
          ? `Feedback: ${request.reviewNote}`
          : `Status: ${request.status}`,
      }));

    const progressEvents = progressEntriesMock
      .filter((entry) => entry.studentId === studentId)
      .map((entry) => ({
        id: `progress-${entry.id}`,
        date: entry.date,
        domain: "progress" as const,
        title: `${entry.weightKg} kg / ${entry.bodyFatPercentage}% BF`,
        description: entry.notes ?? "Atualizacao de progresso.",
        statusLabel: "Atualizado",
        priority: "medium" as const,
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
        statusLabel: "Historico",
        priority: "low" as const,
      }));

    const planEvent = {
      id: `plan-${currentPlanMock.id}`,
      date: currentPlanMock.updatedAt.slice(0, 10),
      domain: "plan" as const,
      title: currentPlanMock.title,
      description: currentPlanMock.trainingPlan.notes ?? "Plano atual ativo.",
      statusLabel: currentPlanMock.status === "draft" ? "Rascunho" : "Ativo",
      priority: getJourneyPriority(
        currentPlanMock.status === "draft" ? "high" : "medium"
      ),
      pending: currentPlanMock.status === "draft",
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
