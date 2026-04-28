import type { ID, ISODateString, ISODateTimeString } from "./common";

export interface ProgressPhoto {
  id: ID;
  imageUrl: string;
  label?: string;
}

export interface ProgressEntry {
  id: ID;
  studentId: ID;
  date: ISODateString;
  weightKg?: number;
  bodyFatPercentage?: number;
  notes?: string;
  photos: ProgressPhoto[];
  createdAt: ISODateTimeString;
}

export type HistoryRecordType =
  | "plan"
  | "assessment"
  | "progress"
  | "exam";

export interface HistoryRecord {
  id: ID;
  studentId: ID;
  type: HistoryRecordType;
  title: string;
  description?: string;
  date: ISODateString;
}
