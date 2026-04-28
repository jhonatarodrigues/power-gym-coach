import type { ID, ISODateTimeString } from "./common";

export type AssessmentStatus = "pending" | "reviewed" | "archived";

export interface AssessmentImage {
  id: ID;
  imageUrl: string;
  label?: string;
}

export interface AssessmentSubmission {
  id: ID;
  studentId: ID;
  teacherId: ID;
  status: AssessmentStatus;
  description: string;
  images: AssessmentImage[];
  submittedAt: ISODateTimeString;
}

export interface AssessmentReview {
  id: ID;
  submissionId: ID;
  teacherId: ID;
  summary: string;
  observations: string;
  suggestedChanges?: string;
  createdNewPlan: boolean;
  reviewedAt: ISODateTimeString;
}
