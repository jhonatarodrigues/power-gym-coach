import type { ID, ISODateTimeString } from "./common";

export type ExamRequestStatus = "pending" | "sent" | "reviewed";

export interface ExamRequest {
  id: ID;
  teacherId: ID;
  studentId: ID;
  title: string;
  note?: string;
  status: ExamRequestStatus;
  requestedAt: ISODateTimeString;
}

export interface ExamUpload {
  id: ID;
  examRequestId: ID;
  studentId: ID;
  fileName: string;
  fileUrl: string;
  uploadedAt: ISODateTimeString;
}
