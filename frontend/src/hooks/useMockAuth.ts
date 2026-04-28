import { useMockSessionStore } from "@/store/useMockSessionStore";

export function useMockAuth() {
  const session = useMockSessionStore((state) => state.session);
  const signInAs = useMockSessionStore((state) => state.signInAs);
  const signOut = useMockSessionStore((state) => state.signOut);

  return {
    session,
    signInAs,
    signOut,
  };
}
