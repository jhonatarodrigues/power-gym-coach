import { create } from "zustand";

import { examRequestsMock, examUploadsMock } from "@/repository/mock";
import type { ExamRequest, ExamRequestStatus, ExamUpload } from "@/types";

interface ExamWorkflowState {
  requests: ExamRequest[];
  uploads: ExamUpload[];
  reset: () => void;
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

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function initialState() {
  return {
    requests: clone(examRequestsMock),
    uploads: clone(examUploadsMock),
  };
}

export const useExamWorkflowStore = create<ExamWorkflowState>((set, get) => ({
  ...initialState(),
  reset: () => set(initialState()),
  requestExam: ({ teacherId, studentId, title, note }) => {
    const nextRequest: ExamRequest = {
      id: `exam-request-${Date.now()}`,
      teacherId,
      studentId,
      title,
      note,
      status: "pending",
      requestedAt: new Date().toISOString(),
    };

    set((state) => ({
      requests: [nextRequest, ...state.requests],
    }));

    return nextRequest;
  },
  uploadExam: ({ examRequestId, studentId, fileName }) => {
    const request = get().requests.find((item) => item.id === examRequestId);

    if (!request) {
      return null;
    }

    const nextUpload: ExamUpload = {
      id: `exam-upload-${Date.now()}`,
      examRequestId,
      studentId,
      fileName,
      fileUrl: `https://example.com/mock/${fileName}`,
      uploadedAt: new Date().toISOString(),
    };

    set((state) => ({
      uploads: [nextUpload, ...state.uploads],
      requests: state.requests.map((item) =>
        item.id === examRequestId ? { ...item, status: "sent" } : item
      ),
    }));

    return nextUpload;
  },
  updateRequestStatus: (examRequestId, status) => {
    let updatedRequest: ExamRequest | null = null;

    set((state) => ({
      requests: state.requests.map((item) => {
        if (item.id !== examRequestId) {
          return item;
        }

        updatedRequest = { ...item, status };
        return updatedRequest;
      }),
    }));

    return updatedRequest;
  },
  reviewExam: ({ examRequestId, reviewNote }) => {
    let reviewedRequest: ExamRequest | null = null;

    set((state) => ({
      requests: state.requests.map((item) => {
        if (item.id !== examRequestId) {
          return item;
        }

        reviewedRequest = {
          ...item,
          status: "reviewed",
          reviewNote,
          reviewedAt: new Date().toISOString(),
        };

        return reviewedRequest;
      }),
    }));

    return reviewedRequest;
  },
}));
