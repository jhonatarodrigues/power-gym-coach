import { useMockSessionStore } from "@/store/useMockSessionStore";

describe("useMockSessionStore", () => {
  beforeEach(() => {
    useMockSessionStore.getState().signOut();
  });

  it("starts unauthenticated", () => {
    expect(useMockSessionStore.getState().session.isAuthenticated).toBe(false);
    expect(useMockSessionStore.getState().currentUser()).toBeNull();
  });

  it("signs in as teacher and resolves the current user", () => {
    useMockSessionStore.getState().signInAs("teacher");

    const { session, currentUser } = useMockSessionStore.getState();

    expect(session.isAuthenticated).toBe(true);
    expect(session.accessLevel).toBe("teacher");
    expect(currentUser()?.name).toBeTruthy();
  });

  it("signs out and clears the current user", () => {
    useMockSessionStore.getState().signInAs("student");

    useMockSessionStore.getState().signOut();

    expect(useMockSessionStore.getState().session).toEqual({
      currentUser: null,
      accessLevel: null,
      isAuthenticated: false,
    });
    expect(useMockSessionStore.getState().currentUser()).toBeNull();
  });
});
