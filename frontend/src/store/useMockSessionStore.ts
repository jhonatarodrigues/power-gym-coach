import { create } from "zustand";

import {
  studentSessionMock,
  teacherSessionMock,
  usersMock,
} from "@/repository/mock";
import type { AccessLevel, AuthSession, User } from "@/types";

interface MockSessionState {
  session: AuthSession;
  signInAs: (accessLevel: AccessLevel) => void;
  signOut: () => void;
  currentUser: () => User | null;
}

const emptySession: AuthSession = {
  currentUser: null,
  accessLevel: null,
  isAuthenticated: false,
};

export const useMockSessionStore = create<MockSessionState>((set, get) => ({
  session: emptySession,
  signInAs: (accessLevel) =>
    set({
      session:
        accessLevel === "teacher" ? teacherSessionMock : studentSessionMock,
    }),
  signOut: () => set({ session: emptySession }),
  currentUser: () => {
    const userId = get().session.currentUser?.id;

    return usersMock.find((user) => user.id === userId) ?? null;
  },
}));
