import { useMockSessionStore } from "@/store/useMockSessionStore";

export function useMockAuth() {
  const session = useMockSessionStore((state) => state.session);
  const signInAs = useMockSessionStore((state) => state.signInAs);
  const signIn = useMockSessionStore((state) => state.signIn);
  const signOut = useMockSessionStore((state) => state.signOut);
  const currentUser = useMockSessionStore((state) => state.currentUser);
  const updateCurrentUserProfile = useMockSessionStore(
    (state) => state.updateCurrentUserProfile
  );
  const findInvitationByEmail = useMockSessionStore(
    (state) => state.findInvitationByEmail
  );
  const completeFirstAccess = useMockSessionStore(
    (state) => state.completeFirstAccess
  );
  const studentInvitations = useMockSessionStore((state) => state.studentInvitations);

  return {
    session,
    signInAs,
    signIn,
    signOut,
    currentUser,
    updateCurrentUserProfile,
    findInvitationByEmail,
    completeFirstAccess,
    studentInvitations,
  };
}
