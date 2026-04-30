import { create } from "zustand";

import {
  studentInvitationsMock,
  studentProfilesMock,
  studentSessionMock,
  teacherProfilesMock,
  teacherSessionMock,
  usersMock,
} from "@/repository/mock";
import type {
  AccessLevel,
  AuthSession,
  StudentInvitation,
  StudentProfile,
  TeacherProfile,
  User,
} from "@/types";

interface SignInInput {
  accessLevel: AccessLevel;
  email: string;
  password: string;
}

interface CompleteFirstAccessInput {
  email: string;
  name: string;
  password: string;
  phone: string;
  avatarUrl?: string;
}

interface UpdateProfileInput {
  name: string;
  phone: string;
  password?: string;
  avatarUrl?: string;
}

interface MockSessionState {
  session: AuthSession;
  users: User[];
  teacherProfiles: TeacherProfile[];
  studentProfiles: StudentProfile[];
  studentInvitations: StudentInvitation[];
  signInAs: (accessLevel: AccessLevel) => void;
  signIn: (input: SignInInput) => boolean;
  signOut: () => void;
  currentUser: () => User | null;
  findInvitationByEmail: (email: string) => StudentInvitation | null;
  completeFirstAccess: (input: CompleteFirstAccessInput) => boolean;
  updateCurrentUserProfile: (input: UpdateProfileInput) => void;
  reset: () => void;
}

const initialUsers = JSON.parse(JSON.stringify(usersMock)) as User[];
const initialTeacherProfiles = JSON.parse(
  JSON.stringify(teacherProfilesMock)
) as TeacherProfile[];
const initialStudentProfiles = JSON.parse(
  JSON.stringify(studentProfilesMock)
) as StudentProfile[];
const initialInvitations = JSON.parse(
  JSON.stringify(studentInvitationsMock)
) as StudentInvitation[];

const emptySession: AuthSession = {
  currentUser: null,
  accessLevel: null,
  isAuthenticated: false,
};

function cloneUser(user: User) {
  return JSON.parse(JSON.stringify(user)) as User;
}

function isValidPassword(password: string) {
  return password.length >= 8 && /[A-Z]/.test(password);
}

export const useMockSessionStore = create<MockSessionState>((set, get) => ({
  session: emptySession,
  users: initialUsers,
  teacherProfiles: initialTeacherProfiles,
  studentProfiles: initialStudentProfiles,
  studentInvitations: initialInvitations,
  signInAs: (accessLevel) =>
    set((state) => {
      const session =
        accessLevel === "teacher" ? teacherSessionMock : studentSessionMock;
      const currentUser = state.users.find((user) => user.id === session.currentUser?.id);

      return {
        session: currentUser
          ? {
              ...session,
              currentUser,
            }
          : session,
      };
    }),
  signIn: ({ accessLevel, email, password }) => {
    const matchedUser = get().users.find(
      (user) =>
        user.accessLevel === accessLevel &&
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password &&
        user.firstAccessCompleted
    );

    if (!matchedUser) {
      set({ session: emptySession });
      return false;
    }

    set({
      session: {
        currentUser: cloneUser(matchedUser),
        accessLevel: matchedUser.accessLevel,
        isAuthenticated: true,
      },
    });

    return true;
  },
  signOut: () => set({ session: emptySession }),
  currentUser: () => {
    const userId = get().session.currentUser?.id;

    return get().users.find((user) => user.id === userId) ?? null;
  },
  findInvitationByEmail: (email) =>
    get().studentInvitations.find(
      (invitation) =>
        invitation.studentEmail.toLowerCase() === email.trim().toLowerCase() &&
        invitation.status === "pending"
    ) ?? null,
  completeFirstAccess: ({ email, name, password, phone, avatarUrl }) => {
    const invitation = get().findInvitationByEmail(email);

    if (!invitation || !isValidPassword(password)) {
      return false;
    }

    const newUser: User = {
      id: `user-student-${Date.now()}`,
      name,
      email: invitation.studentEmail,
      cpf: "000.000.000-00",
      phone,
      password,
      accessLevel: "student",
      avatarUrl,
      firstAccessCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextInvitations = get().studentInvitations.map((currentInvitation) =>
      currentInvitation.id === invitation.id
        ? { ...currentInvitation, status: "completed" as const }
        : currentInvitation
    );

    const nextStudentProfiles = [
      ...get().studentProfiles,
      {
        id: `student-profile-${Date.now()}`,
        userId: newUser.id,
        teacherId: invitation.teacherId,
        goal: "Novo aluno em onboarding",
        restrictions: "Sem restricoes informadas no primeiro acesso.",
      },
    ];

    set((state) => ({
      users: [...state.users, newUser],
      studentProfiles: nextStudentProfiles,
      studentInvitations: nextInvitations,
      session: {
        currentUser: newUser,
        accessLevel: "student",
        isAuthenticated: true,
      },
    }));

    return true;
  },
  updateCurrentUserProfile: ({ name, phone, password, avatarUrl }) =>
    set((state) => {
      const currentUserId = state.session.currentUser?.id;

      if (!currentUserId) {
        return state;
      }

      const nextUsers = state.users.map((user) => {
        if (user.id !== currentUserId) {
          return user;
        }

        return {
          ...user,
          name,
          phone,
          avatarUrl: avatarUrl || user.avatarUrl,
          password: password && isValidPassword(password) ? password : user.password,
          updatedAt: new Date().toISOString(),
        };
      });

      const currentUser = nextUsers.find((user) => user.id === currentUserId) ?? null;

      return {
        users: nextUsers,
        session: currentUser
          ? {
              currentUser: cloneUser(currentUser),
              accessLevel: currentUser.accessLevel,
              isAuthenticated: true,
            }
          : state.session,
      };
    }),
  reset: () =>
    set({
      session: emptySession,
      users: JSON.parse(JSON.stringify(usersMock)) as User[],
      teacherProfiles: JSON.parse(JSON.stringify(teacherProfilesMock)) as TeacherProfile[],
      studentProfiles: JSON.parse(JSON.stringify(studentProfilesMock)) as StudentProfile[],
      studentInvitations: JSON.parse(
        JSON.stringify(studentInvitationsMock)
      ) as StudentInvitation[],
    }),
}));
