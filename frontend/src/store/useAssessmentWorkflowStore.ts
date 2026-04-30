import { create } from "zustand";

import { assessmentReviewsMock, assessmentSubmissionsMock } from "@/repository/mock";
import type { AssessmentReview, AssessmentSubmission } from "@/types";

interface AssessmentWorkflowState {
  submissions: AssessmentSubmission[];
  reviews: AssessmentReview[];
  reset: () => void;
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

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function initialState() {
  return {
    submissions: clone(assessmentSubmissionsMock),
    reviews: clone(assessmentReviewsMock),
  };
}

export const useAssessmentWorkflowStore = create<AssessmentWorkflowState>((set) => ({
  ...initialState(),
  reset: () => set(initialState()),
  submitAssessment: ({ studentId, teacherId, description }) => {
    const nextSubmission: AssessmentSubmission = {
      id: `assessment-submission-${Date.now()}`,
      studentId,
      teacherId,
      status: "pending",
      description,
      images: [
        {
          id: `assessment-image-${Date.now()}`,
          imageUrl: "https://example.com/mock/follow-up-assessment.jpg",
          label: "Atualizacao mockada",
        },
      ],
      submittedAt: new Date().toISOString(),
    };

    set((state) => ({
      submissions: [nextSubmission, ...state.submissions],
    }));

    return nextSubmission;
  },
  createReview: ({
    createdNewPlan,
    observations,
    submissionId,
    suggestedChanges,
    summary,
    teacherId,
  }) => {
    const nextReview: AssessmentReview = {
      id: `assessment-review-${Date.now()}`,
      submissionId,
      teacherId,
      summary,
      observations,
      suggestedChanges,
      createdNewPlan,
      reviewedAt: new Date().toISOString(),
    };

    set((state) => ({
      reviews: [nextReview, ...state.reviews],
      submissions: state.submissions.map((submission) =>
        submission.id === submissionId
          ? { ...submission, status: "reviewed" }
          : submission
      ),
    }));

    return nextReview;
  },
}));
