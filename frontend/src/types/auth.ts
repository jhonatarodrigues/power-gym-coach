import type { ID, ISODateTimeString } from "./common";

export type AccessLevel = "teacher" | "student";

export interface User {
  id: ID;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  accessLevel: AccessLevel;
  avatarUrl?: string;
  firstAccessCompleted: boolean;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export interface TeacherProfile {
  id: ID;
  userId: ID;
  cref?: string;
  bio?: string;
}

export interface StudentProfile {
  id: ID;
  userId: ID;
  teacherId: ID;
  birthDate?: string;
  goal: string;
  restrictions?: string;
}

export interface StudentInvitation {
  id: ID;
  teacherId: ID;
  studentEmail: string;
  studentName?: string;
  generatedAt: ISODateTimeString;
  firstAccessLink: string;
  status: "pending" | "completed";
}

export interface AuthSession {
  currentUser: User | null;
  accessLevel: AccessLevel | null;
  isAuthenticated: boolean;
}
