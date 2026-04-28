import type { ID, ISODateTimeString } from "./common";

export type AccessLevel = "teacher" | "student";

export interface User {
  id: ID;
  name: string;
  email: string;
  accessLevel: AccessLevel;
  avatarUrl?: string;
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

export interface AuthSession {
  currentUser: User | null;
  accessLevel: AccessLevel | null;
  isAuthenticated: boolean;
}
