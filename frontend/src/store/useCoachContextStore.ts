import { create } from "zustand";

import { allPlansMock, studentProfilesMock, usersMock } from "@/repository/mock";
import type { Plan, StudentProfile, User } from "@/types";

interface CreateCoachPlanInput {
  studentId: string;
  title: string;
  startDate: string;
  endDate?: string;
}

interface CoachContextState {
  students: Array<{ profile: StudentProfile; user: User }>;
  plans: Plan[];
  selectedStudentId: string;
  selectedPlanId: string;
  selectStudent: (studentId: string) => void;
  selectPlan: (planId: string) => void;
  createPlan: (input: CreateCoachPlanInput) => Plan;
  getSelectedStudent: () => { profile: StudentProfile; user: User } | null;
  getPlansByStudent: (studentId: string) => Plan[];
  getSelectedPlan: () => Plan | null;
  reset: () => void;
}

function buildStudents() {
  return studentProfilesMock
    .map((profile) => {
      const user = usersMock.find((item) => item.id === profile.userId);

      if (!user) {
        return null;
      }

      return { profile, user };
    })
    .filter(Boolean) as Array<{ profile: StudentProfile; user: User }>;
}

function sortPlans(plans: Plan[]) {
  return [...plans].sort((left, right) => right.startDate.localeCompare(left.startDate));
}

const initialStudents = buildStudents();
const initialPlans = sortPlans(allPlansMock);
const initialSelectedStudentId = initialStudents[0]?.user.id ?? "";
const initialSelectedPlanId =
  initialPlans.find((plan) => plan.studentId === initialSelectedStudentId)?.id ?? "";

function createBlankPlan({
  endDate,
  startDate,
  studentId,
  title,
}: CreateCoachPlanInput): Plan {
  return {
    id: `plan-${Date.now()}`,
    studentId,
    teacherId: "user-teacher-1",
    title,
    status: "draft",
    startDate,
    endDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trainingPlan: {
      id: `training-${Date.now()}`,
      title: "Treino em montagem",
      notes: "Plano iniciado pelo coach e aguardando estruturacao completa.",
      days: [],
    },
    dietPlan: {
      id: `diet-${Date.now()}`,
      title: "Dieta em montagem",
      notes: "Plano alimentar ainda sem refeicoes cadastradas.",
      meals: [],
      supplements: [],
      waterLitersTarget: 2.5,
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
    },
  };
}

export const useCoachContextStore = create<CoachContextState>((set, get) => ({
  students: initialStudents,
  plans: initialPlans,
  selectedStudentId: initialSelectedStudentId,
  selectedPlanId: initialSelectedPlanId,
  selectStudent: (studentId) =>
    set((state) => ({
      selectedStudentId: studentId,
      selectedPlanId:
        sortPlans(state.plans).find((plan) => plan.studentId === studentId)?.id ?? "",
    })),
  selectPlan: (planId) => set({ selectedPlanId: planId }),
  createPlan: (input) => {
    const plan = createBlankPlan(input);

    set((state) => ({
      plans: sortPlans([plan, ...state.plans]),
      selectedStudentId: input.studentId,
      selectedPlanId: plan.id,
    }));

    return plan;
  },
  getSelectedStudent: () =>
    get().students.find((student) => student.user.id === get().selectedStudentId) ?? null,
  getPlansByStudent: (studentId) =>
    sortPlans(get().plans.filter((plan) => plan.studentId === studentId)),
  getSelectedPlan: () => get().plans.find((plan) => plan.id === get().selectedPlanId) ?? null,
  reset: () =>
    set({
      students: buildStudents(),
      plans: sortPlans(allPlansMock),
      selectedStudentId: initialSelectedStudentId,
      selectedPlanId: initialSelectedPlanId,
    }),
}));
