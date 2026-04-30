import { useMockSessionStore } from "@/store/useMockSessionStore";

describe("useMockSessionStore", () => {
  beforeEach(() => {
    useMockSessionStore.getState().reset();
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

  it("authenticates by email and senha", () => {
    const success = useMockSessionStore.getState().signIn({
      accessLevel: "teacher",
      email: "rafael@powergymcoach.app",
      password: "Rafael123",
    });

    expect(success).toBe(true);
    expect(useMockSessionStore.getState().session.currentUser?.email).toBe(
      "rafael@powergymcoach.app"
    );
  });

  it("completes first access for an invited student", () => {
    const success = useMockSessionStore.getState().completeFirstAccess({
      email: "novo.aluno@powergymcoach.app",
      name: "Novo aluno",
      phone: "(11) 97777-1111",
      password: "AlunoNovo1",
      avatarUrl: "https://example.com/avatar.jpg",
    });

    expect(success).toBe(true);
    expect(useMockSessionStore.getState().session.accessLevel).toBe("student");
  });
});
