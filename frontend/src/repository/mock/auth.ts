import type { AuthSession, StudentProfile, TeacherProfile, User } from "@/types";

export const usersMock: User[] = [
  {
    id: "user-teacher-1",
    name: "Rafael Duarte",
    email: "rafael@powergymcoach.app",
    accessLevel: "teacher",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    createdAt: "2026-04-01T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "user-student-1",
    name: "Marina Costa",
    email: "marina@powergymcoach.app",
    accessLevel: "student",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    createdAt: "2026-04-02T08:00:00.000Z",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
];

export const teacherProfilesMock: TeacherProfile[] = [
  {
    id: "teacher-profile-1",
    userId: "user-teacher-1",
    cref: "123456-G/SP",
    bio: "Personal focado em hipertrofia, emagrecimento e acompanhamento com rotina alimentar.",
  },
];

export const studentProfilesMock: StudentProfile[] = [
  {
    id: "student-profile-1",
    userId: "user-student-1",
    teacherId: "user-teacher-1",
    birthDate: "1998-08-10",
    goal: "Hipertrofia com ganho de massa magra e melhora do condicionamento.",
    restrictions: "Leve desconforto no joelho esquerdo em agachamentos profundos.",
  },
];

export const teacherSessionMock: AuthSession = {
  currentUser: usersMock[0],
  accessLevel: "teacher",
  isAuthenticated: true,
};

export const studentSessionMock: AuthSession = {
  currentUser: usersMock[1],
  accessLevel: "student",
  isAuthenticated: true,
};
